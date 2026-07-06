"use client";

import { createClient } from "@/app/_utils/supabase/client";
import { useEffect, useRef, useState } from "react";
import Message from "./Message";

function MessageList({ channelId, message }) {
  const [messages, setMessages] = useState(message);
  const bottomOfPanelRef = useRef(null);
  const channelRef = useRef(null);
  const pendingBroadcastsRef = useRef([]);
  const isSubscribedRef = useRef(false);

  useEffect(() => {
    setMessages(message);
  }, [message]);

  useEffect(() => {
    const appendMessage = (newMessage) => {
      if (String(newMessage.channel_id) !== String(channelId)) return;

      setMessages((currentMessages) => {
        if (
          currentMessages.some(
            (message) => String(message.id) === String(newMessage.id)
          )
        ) {
          return currentMessages;
        }

        return [...currentMessages, newMessage];
      });
    };

    const broadcastMessage = (newMessage) => {
      const channel = channelRef.current;

      if (!channel || !isSubscribedRef.current) {
        pendingBroadcastsRef.current.push(newMessage);
        return;
      }

      channel.send({
        type: "broadcast",
        event: "message",
        payload: newMessage,
      });
    };

    const flushPendingBroadcasts = () => {
      const pendingBroadcasts = pendingBroadcastsRef.current;
      pendingBroadcastsRef.current = [];

      pendingBroadcasts.forEach((newMessage) => {
        broadcastMessage(newMessage);
      });
    };

    const handleLocalSendMessage = (event) => {
      appendMessage(event.detail);
      broadcastMessage(event.detail);
    };

    window.addEventListener("sonant:send-message", handleLocalSendMessage);

    const supabase = createClient();
    const channel = supabase
      .channel(`messages:${channelId}`)
      .on("broadcast", { event: "message" }, ({ payload }) => {
        appendMessage(payload);
      })
      .subscribe((status) => {
        isSubscribedRef.current = status === "SUBSCRIBED";

        if (status === "SUBSCRIBED") {
          flushPendingBroadcasts();
        }
      });

    channelRef.current = channel;

    return () => {
      window.removeEventListener("sonant:send-message", handleLocalSendMessage);
      channelRef.current = null;
      pendingBroadcastsRef.current = [];
      isSubscribedRef.current = false;
      supabase.removeChannel(channel);
    };
  }, [channelId]);

  useEffect(() => {
    if (bottomOfPanelRef.current) {
      bottomOfPanelRef.current.scrollIntoView();
    }
  }, [messages]);

  return (
    <div className="flex flex-col gap-y-1 overflow-auto">
      {messages.map((message) => {
        return (
          <div key={message.id}>
            <Message message={message} />
          </div>
        );
      })}
      <div ref={bottomOfPanelRef}></div>
    </div>
  );
}

export default MessageList;

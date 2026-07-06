"use client";

import { createClient } from "@/app/_utils/supabase/client";
import { useEffect, useRef, useState } from "react";
import Message from "./Message";

function MessageList({ channelId, message }) {
  const [messages, setMessages] = useState(message);
  const bottomOfPanelRef = useRef(null);

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

    const handleLocalBroadcastMessage = (event) => {
      appendMessage(event.detail);
    };

    window.addEventListener(
      "sonant:broadcast-message",
      handleLocalBroadcastMessage
    );

    const supabase = createClient();
    const channel = supabase
      .channel(`messages:${channelId}`)
      .on("broadcast", { event: "message" }, ({ payload }) => {
        appendMessage(payload);
      })
      .subscribe();

    return () => {
      window.removeEventListener(
        "sonant:broadcast-message",
        handleLocalBroadcastMessage
      );
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

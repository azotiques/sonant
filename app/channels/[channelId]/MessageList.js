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
    const supabase = createClient();

    const channel = supabase
      .channel(`messages:${channelId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "message",
          filter: `channel_id=eq.${channelId}`,
        },
        (payload) => {
          setMessages((currentMessages) => [...currentMessages, payload.new]);
        }
      )
      .subscribe();

    return () => {
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

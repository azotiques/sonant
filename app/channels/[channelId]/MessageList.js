"use client";

import { createClient } from "@/app/_utils/supabase/client";
import { useEffect, useRef, useState } from "react";
import Message from "./Message";
function MessageList({ channelId, message }) {
  const [messages, setMessages] = useState(message);

  const supabase = createClient();

  const channel = supabase
    .channel("messages")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        filter: `channel_id=eq.${channelId}`,
        table: "message",
      },
      (payload) => setMessages([...messages, payload.new])
    )
    .subscribe();

  const bottomOfPanelRef = useRef(null);

  useEffect(() => {
    if (bottomOfPanelRef.current) {
      bottomOfPanelRef.current.scrollIntoView();
    }
  }, [messages]);

  return (
    <div className="flex flex-col gap-y-1 overflow-auto">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      <div ref={bottomOfPanelRef}></div>
    </div>
  );
}

export default MessageList;

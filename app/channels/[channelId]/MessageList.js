"use client";

import { createClient } from "@/app/_utils/supabase/client";
import { useState } from "react";
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

  return (
    <div className="flex flex-col gap-y-3 overflow-auto">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
}

export default MessageList;

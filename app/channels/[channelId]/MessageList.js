"use client";

import { createClient } from "@/app/_utils/supabase/client";
import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { getUser } from "@/app/_utils/actions";
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

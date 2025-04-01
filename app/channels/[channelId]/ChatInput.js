"use client";

import { sendMessage } from "@/app/_utils/actions";
import { Input } from "@/components/ui/input";
import { TriangleAlert } from "lucide-react";
import { useState } from "react";

function ChatInput({ channelId }) {
  const [message, setMessage] = useState("");

  const handleInput = (e) => {
    e.preventDefault();

    setMessage(e.target.value);
  };

  const handleSubmit = () => setMessage("");

  return (
    <div className="flex flex-col justify-center items-center">
      <form action={sendMessage} onSubmit={handleSubmit}>
        <input name="channel_id" type="hidden" value={channelId} />
        <div className="flex flex-row px-4 py-3 w-[40vw] border-zinc-800 shadow-zinc-950/40 shadow-xl border-1 rounded-4xl text-white break-normal">
          <input
            placeholder="Message"
            onChange={handleInput}
            value={message}
            className="px-4 py-3 w-[30vw] bg-zinc-950 rounded-3xl text-white break-normal"
            name="content"
            type="text"
          />
        </div>

        {message.length > 210 && (
          <div className="flex flex-row items-center gap-x-2">
            <TriangleAlert className="size-4 text-rose-600" />
            <span className="text-rose-600">{250 - message.length}</span>
          </div>
        )}
      </form>
    </div>
  );
}

export default ChatInput;

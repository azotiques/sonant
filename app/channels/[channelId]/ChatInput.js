"use client";

import { sendMessage } from "@/app/_utils/actions";
import { createClient } from "@/app/_utils/supabase/client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import EmojiPicker from "emoji-picker-react";
import { SmilePlus, TriangleAlert } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Snowflake } from "@theinternetfolks/snowflake";

function ChatInput({ channelId, user }) {
  const [message, setMessage] = useState("");
  const broadcastChannelRef = useRef(null);

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase.channel(`messages:${channelId}`);

    broadcastChannelRef.current = channel;
    channel.subscribe();

    return () => {
      broadcastChannelRef.current = null;
      supabase.removeChannel(channel);
    };
  }, [channelId]);

  const handleInput = (e) => {
    e.preventDefault();

    setMessage(e.target.value);
  };

  const handleSubmit = () => {
    const content = message.trim();

    if (!content) return;

    const liveMessage = {
      id: Snowflake.generate(),
      channel_id: channelId,
      author: user,
      content,
    };

    window.dispatchEvent(
      new CustomEvent("sonant:broadcast-message", {
        detail: liveMessage,
      })
    );

    broadcastChannelRef.current?.send({
      type: "broadcast",
      event: "message",
      payload: liveMessage,
    });

    setMessage("");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="fixed bottom-30"></div>

      <form action={sendMessage} onSubmit={handleSubmit}>
        <input name="channel_id" type="hidden" value={channelId} />
        <div className="flex items-center justify-between flex-row px-5 py-3 md:w-[40vw] md:h-18 xs:w-[70vw] xs:h-15 border-neutral-800 shadow-neutral-950/40 shadow-xl border-1 rounded-4xl text-white break-normal">
          <input
            placeholder="Message"
            onChange={handleInput}
            value={message}
            className="px-4 py-3 outline-none md:w-[30vw] bg-neutral-950 xs:w-[50vw] md:text-md xs:text-xs rounded-3xl text-white break-normal"
            name="content"
            type="text"
          />
          <Popover>
            <PopoverTrigger asChild>
              <button type="button">
                <SmilePlus className="text-neutral-400 hover:scale-110 hover:text-yellow-300 transition-all duration-300" />
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <EmojiPicker
                theme="auto"
                onEmojiClick={(emoji) =>
                  setMessage((s) => s.concat(emoji.emoji))
                }
              />
            </PopoverContent>
          </Popover>
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

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendFriendRequest } from "../_utils/actions";
import { useActionState } from "react";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  AlertOctagon,
  Triangle,
  TriangleAlert,
} from "lucide-react";

function AddFriend() {
  const [message, formAction] = useActionState(sendFriendRequest, null);

  return (
    <div className="flex flex-col gap-y-3">
      <h1 className="text-white text-2xl font-semibold">Add Friend</h1>
      <span className="text-white">
        Add your friends with their Sonant usernames.
      </span>
      <div className="flex flex-col">
        <form action={formAction}>
          <div
            className={cn(
              "flex flex-row items-center justify-between gap-x-2 px-4 py-3 w-180 border-neutral-800 shadow-neutral-950/40 shadow-xl border-1 rounded-4xl text-white break-normal",
              message &&
                "flex flex-row items-center justify-between gap-x-2 px-4 py-3 w-180 border-red-400 shadow-neutral-950/40 shadow-xl border-1 rounded-4xl text-white break-normal"
            )}
          >
            <input
              placeholder="Enter your friend's Sonant username."
              className="px-4 py-3 w-[30vw] bg-neutral-950 rounded-3xl text-white break-normal"
              name="username"
              type="text"
            />
            <Button size="lg">Send friend request</Button>
          </div>
        </form>
      </div>
      {message && (
        <span className="text-red-400 flex gap-x-2 items-center">
          <TriangleAlert className="size-4" />
          {message}
        </span>
      )}
    </div>
  );
}

export default AddFriend;

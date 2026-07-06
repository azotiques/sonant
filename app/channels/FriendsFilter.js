"use client";

import { cn } from "@/lib/utils";
import { UserPlus, UsersRound } from "lucide-react";
function FriendsFilter({ activeTab, setActiveTab }) {
  return (
    <div className="px-6 py-3 flex flex-row gap-x-10 items-center">
      <div className="flex flex-row gap-x-2 items-center">
        <UsersRound className="size-5 text-zinc-400" />
        <span className="text-zinc-400">Friends</span>
      </div>

      <button
        onClick={() => setActiveTab("all")}
        className={cn(
          "rounded-lg px-3 py-2 text-zinc-400 transition-all hover:bg-zinc-800 hover:text-white",
          activeTab === "all" && "bg-zinc-800 text-white"
        )}
      >
        All
      </button>
      <button
        onClick={() => setActiveTab("pending")}
        className={cn(
          "rounded-lg px-3 py-2 text-zinc-400 transition-all hover:bg-zinc-800 hover:text-white",
          activeTab === "pending" && "bg-zinc-800 text-white"
        )}
      >
        Pending
      </button>
      <button
        onClick={() => setActiveTab("add")}
        className={cn(
          "flex items-center gap-2 rounded-lg border-t border-white bg-linear-to-r/longer from-teal-100 to-indigo-300 px-3 py-2 text-neutral-950 transition-all hover:from-teal-200 hover:to-indigo-400",
          activeTab === "add" && "text-neutral-700"
        )}
      >
        <UserPlus className="size-4" />
        Add Friend
      </button>
    </div>
  );
}

export default FriendsFilter;

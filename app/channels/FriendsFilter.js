"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { PersonStanding, UsersRound } from "lucide-react";
function FriendsFilter({ activeTab, setActiveTab }) {
  return (
    <div className="px-6 py-3 flex flex-row gap-x-10 items-center">
      <div className="flex flex-row gap-x-2 items-center">
        <UsersRound className="size-5 text-zinc-500" />
        <span className="text-zinc-500">Friends</span>
      </div>

      <button
        onClick={() => setActiveTab("all")}
        className={cn(
          "text-zinc-500 hover:bg-zinc-700 hover:text-white px-3 py-2 rounded-lg transition-all",
          activeTab === "all" && "text-white bg-zinc-800"
        )}
      >
        All
      </button>

      <button
        onClick={() => setActiveTab("pending")}
        className={cn(
          "text-zinc-500 hover:bg-zinc-700 hover:text-white px-3 py-2 rounded-lg transition-all",
          activeTab === "pending" && "text-white bg-zinc-800"
        )}
      >
        Pending
      </button>
      <button
        onClick={() => setActiveTab("add")}
        className={cn(
          "text-zinc-950 border-white border-t-1 bg-linear-to-r/longer from-teal-100 to-indigo-200 hover:bg-zinc-700 hover:text-zinc-500 px-3 py-2 rounded-lg transition-all",
          activeTab === "add" && "text-zinc-700"
        )}
      >
        Add Friend
      </button>
    </div>
  );
}

export default FriendsFilter;

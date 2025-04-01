"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { PersonStanding, UsersRound } from "lucide-react";
function FriendsFilter({ activeTab, setActiveTab }) {
  return (
    <div className="px-6 py-3 flex flex-row gap-x-10 items-center">
      <div className="flex flex-row gap-x-2 items-center">
        <UsersRound className="size-5 text-slate-500" />
        <span className="text-slate-500">Friends</span>
      </div>

      <button
        onClick={() => setActiveTab("all")}
        className={cn(
          "text-slate-500 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-lg transition-all",
          activeTab === "all" && "text-white bg-slate-800"
        )}
      >
        All
      </button>
      <button
        onClick={() => setActiveTab("add")}
        className={cn(
          "text-slate-500 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-lg transition-all",
          activeTab === "add" && "text-white bg-slate-800"
        )}
      >
        Add Friend
      </button>
      <button
        onClick={() => setActiveTab("pending")}
        className={cn(
          "text-slate-500 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-lg transition-all",
          activeTab === "pending" && "text-white bg-slate-800"
        )}
      >
        Pending
      </button>
    </div>
  );
}

export default FriendsFilter;

"use client";

import { useState } from "react";
import FriendsFilter from "./FriendsFilter";
import AddFriend from "./AddFriend";
import AllFriends from "./AllFriends";
import { Separator } from "@/components/ui/separator";
import PendingFriends from "./PendingFriends";

function Page() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="h-screen bg-slate-900">
      <Separator className="bg-slate-800" />
      <FriendsFilter activeTab={activeTab} setActiveTab={setActiveTab} />
      <Separator className="bg-slate-800" />
      <div className="px-6 py-5">
        {activeTab === "add" && <AddFriend />}
        {activeTab === "all" && <AllFriends />}
        {activeTab === "pending" && <PendingFriends />}
      </div>
    </div>
  );
}

export default Page;

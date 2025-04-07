"use client";

import { useState } from "react";
import AddFriend from "./AddFriend";
import AllFriends from "./AllFriends";
import PendingFriends from "./PendingFriends";
import FriendsFilter from "./FriendsFilter";
import { Separator } from "@/components/ui/separator";

function Tabs({ userAccount, users, userRequests, userSent }) {
  const [activeTab, setActiveTab] = useState("all");
  return (
    <div className="h-screen w-screen bg-zinc-900">
      <FriendsFilter activeTab={activeTab} setActiveTab={setActiveTab} />
      <Separator className="bg-zinc-800" />
      <div className="px-6 py-5">
        {activeTab === "add" && <AddFriend />}
        {activeTab === "all" && <AllFriends users={users} />}
        {activeTab === "pending" && (
          <PendingFriends data={userRequests} dataSent={userSent} />
        )}
      </div>
    </div>
  );
}

export default Tabs;

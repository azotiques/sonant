"use client";

import { useState } from "react";
import AddFriend from "./AddFriend";
import AllFriends from "./AllFriends";
import PendingFriends from "./PendingFriends";
import FriendsFilter from "./FriendsFilter";
import { Separator } from "@/components/ui/separator";

function Tabs({ users, userRequests, userSent }) {
  const [activeTab, setActiveTab] = useState("all");
  return (
    <div className="h-full w-full overflow-hidden bg-zinc-950">
      <FriendsFilter activeTab={activeTab} setActiveTab={setActiveTab} />
      <Separator className="bg-zinc-800" />
      <div className="h-[calc(100%-57px)] overflow-y-auto px-6 py-5">
        {activeTab === "all" && <AllFriends users={users} />}
        {activeTab === "add" && <AddFriend />}
        {activeTab === "pending" && (
          <PendingFriends data={userRequests} dataSent={userSent} />
        )}
      </div>
    </div>
  );
}

export default Tabs;

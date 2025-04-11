"use client";

import { useQuery } from "@tanstack/react-query";
import { getFriends } from "../_utils/actions";
import { LoaderCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import UserDialog from "../_components/UserDialog";

function AllFriends({ users: friends }) {
  return (
    <div>
      {friends.length > 0 && (
        <div className="flex flex-col gap-y-2">
          <span className="text-white font-semibold">{`All friends - ${friends.length}`}</span>
          <Separator className="bg-neutral-800" />
          {friends.map((user) => (
            <div key={user.id} className="flex flex-col gap-y-2">
              <UserDialog user={user} type="friend" />
              <Separator className="bg-neutral-800" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllFriends;

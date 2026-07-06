"use client";

import { useQuery } from "@tanstack/react-query";
import { getFriends } from "../_utils/actions";
import { Separator } from "@/components/ui/separator";
import UserDialog from "../_components/UserDialog";

function AllFriends({ users: friends }) {
  const { data } = useQuery({
    queryKey: ["friends"],
    queryFn: () => getFriends(),
    initialData: { users: friends },
  });
  const users = data?.users ?? [];

  return (
    <div>
      {users.length > 0 && (
        <div className="flex flex-col gap-y-2">
          <span className="text-white font-semibold">{`All friends - ${users.length}`}</span>
          <Separator className="bg-zinc-800" />
          {users.map((user) => (
            <div key={user.id} className="flex flex-col gap-y-2">
              <UserDialog user={user} type="friend" />
              <Separator className="bg-zinc-800" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllFriends;

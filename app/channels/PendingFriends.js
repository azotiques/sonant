"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getPendingFriendRequests,
  getSentFriendRequests,
} from "../_utils/actions";
import UserDialog from "../_components/UserDialog";
import { Separator } from "@/components/ui/separator";

function PendingFriends({ data, dataSent }) {
  const { data: receivedData } = useQuery({
    queryKey: ["friend-requests", "received"],
    queryFn: () => getPendingFriendRequests(),
    initialData: { userRequests: data },
  });
  const { data: sentData } = useQuery({
    queryKey: ["friend-requests", "sent"],
    queryFn: () => getSentFriendRequests(),
    initialData: { userSent: dataSent },
  });
  const receivedRequests = receivedData?.userRequests ?? [];
  const sentRequests = sentData?.userSent ?? [];

  return (
    <div className="flex flex-col gap-y-4">
      {receivedRequests.length > 0 && (
        <div className="flex flex-col gap-y-2">
          <span className="text-white font-semibold">{`Received - ${receivedRequests.length}`}</span>
          <Separator className="bg-zinc-800" />
          {receivedRequests.map((user) => (
            <div key={user.id} className="flex flex-col gap-y-2">
              <UserDialog user={user} type="request" />
              <Separator className="bg-zinc-800" />
            </div>
          ))}
        </div>
      )}

      {sentRequests.length > 0 && (
        <div className="flex flex-col gap-y-2">
          <span className="text-white font-semibold">
            {`Sent - ${sentRequests.length}`}
          </span>
          <Separator className="bg-zinc-800" />
          {sentRequests.map((user) => (
            <div key={user.id} className="flex flex-col gap-y-2">
              <UserDialog user={user} type="sent" />
              <Separator className="bg-zinc-800" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PendingFriends;

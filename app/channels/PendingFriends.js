"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getPendingFriendRequests,
  getSentFriendRequests,
} from "../_utils/actions";
import { LoaderCircle } from "lucide-react";
import UserDialog from "../_components/UserDialog";
import useUser from "@/hooks/useUser";
import { Separator } from "@/components/ui/separator";
import { createClient } from "../_utils/supabase/client";

function PendingFriends({ data, dataSent }) {
  return (
    <div className="flex flex-col gap-y-4">
      {data.length > 0 && (
        <div className="flex flex-col gap-y-2">
          <span className="text-white font-semibold">{`Received - ${data.length}`}</span>
          <Separator className="bg-zinc-800" />
          {data.map((user) => (
            <div key={user.id} className="flex flex-col gap-y-2">
              <UserDialog user={user} type="request" />
              <Separator className="bg-zinc-800" />
            </div>
          ))}
        </div>
      )}

      {dataSent.length > 0 && (
        <div className="flex flex-col gap-y-2">
          <span className="text-white font-semibold">
            {`Sent - ${dataSent.length}`}
          </span>
          <Separator className="bg-zinc-800" />
          {dataSent.map((user) => (
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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { acceptFriendRequest } from "../_utils/actions";
import { Send } from "lucide-react";
import Link from "next/link";

function UserDialog({ user, type }) {
  if (type === "friend") {
    return (
      <Link className="block w-full" href={`/channels/${user.channelId}`}>
        <div className="flex w-full items-center gap-x-3 rounded-lg px-3 py-2 text-left hover:bg-zinc-800">
          <Avatar className="size-10">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="bg-zinc-800 text-zinc-200">
              {user.username.at(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="text-white">{user.global_name}</div>
        </div>
      </Link>
    );
  }

  const trigger = (
      <button
        type="button"
        className="flex w-full flex-col rounded-lg px-3 py-2 text-left hover:bg-zinc-800"
      >
        <div className="flex items-center gap-x-3">
          <Avatar className="size-10">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="bg-zinc-800 text-zinc-200">
              {user.username.at(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="text-white">{user.global_name}</div>
        </div>
      </button>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="border-0 bg-zinc-950">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-y-8">
              <Avatar className="size-26">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-zinc-800 text-zinc-200">
                  <span className="text-4xl">
                    {user.global_name.at(0).toUpperCase()}
                  </span>
                </AvatarFallback>
              </Avatar>
              <DialogTitle>
                <div className="flex flex-col gap-y-3">
                  <span className="font-bold text-white">
                    {user.global_name}
                  </span>
                  <span className="text-sm text-white">{user.username}</span>
                </div>
              </DialogTitle>
            </div>
            <div className="flex flex-col gap-y-3">
              {type === "request" && (
                <div className="flex flex-col gap-y-3">
                  <form action={acceptFriendRequest}>
                    <input type="hidden" name="id" value={user.id} />
                    <Button>Accept friend request</Button>
                  </form>
                  <Link href={`/channels/${user.channelId}`}>
                    <input type="hidden" name="id" value={user.id} />
                    <Button>
                      Send message <Send />
                    </Button>
                  </Link>
                </div>
              )}

              {type === "sent" && (
                <Link href={`/channels/${user.channelId}`}>
                  <input type="hidden" name="id" value={user.id} />
                  <Button>
                    Send message <Send />
                  </Button>
                </Link>
              )}

            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default UserDialog;

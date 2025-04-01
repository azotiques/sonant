import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  acceptFriendRequest,
  createChannel,
  getChannel,
  goToChannel,
  sendMessage,
} from "../_utils/actions";
import {
  MessageCircle,
  MessageCircleIcon,
  MessageSquareIcon,
  Send,
} from "lucide-react";

function UserDialog({ user, type }) {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex flex-col px-3 py-2  hover:bg-slate-800 rounded-lg">
          <div className="flex items-center gap-x-3">
            <Avatar className="size-10">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>
                {user.username.at(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="text-white">{user.global_name}</div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-slate-900 border-0">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-y-8">
              <Avatar className="size-26">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>
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
                  <form action={goToChannel}>
                    <input type="hidden" name="id" value={user.id} />
                    <Button>
                      Send message <Send />
                    </Button>
                  </form>
                </div>
              )}

              {type === "sent" && (
                <form action={goToChannel}>
                  <input type="hidden" name="id" value={user.id} />
                  <Button>
                    Send message <Send />
                  </Button>
                </form>
              )}

              {type === "friend" && (
                <form action={goToChannel}>
                  <input type="hidden" name="id" value={user.id} />
                  <Button>
                    Send message <Send />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default UserDialog;

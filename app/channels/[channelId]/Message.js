import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

function Message({ message }) {
  return (
    <div className="flex flex-col gap-y-1 px-2">
      <div className="flex flex-row items-center gap-x-3 hover:bg-neutral-800 px-3 py-2">
        <Avatar className="size-10">
          <AvatarImage>
            <img
              className="w-12 h-12 rounded-full"
              src={message.author.avatar}
            />
          </AvatarImage>
          <AvatarFallback className>
            {message.author.global_name.at(0)}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <div className="flex flex-row gap-x-3 items-center">
            <span className="font-semibold text-white text-l">
              {message.author.global_name}
            </span>
            <span className="text-white/30 text-xs">
              {format(message.timestamp, "dd/MM/yyyy HH:mm")}
            </span>
          </div>
          <span className="text-white text-l">{message.content}</span>
        </div>
      </div>
    </div>
  );
}

export default Message;

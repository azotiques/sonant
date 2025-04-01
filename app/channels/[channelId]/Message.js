import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

function Message({ message }) {
  return (
    <div className="flex flex-col gap-y-1 px-2">
      <Separator className="bg-zinc-800" />
      <div className="flex flex-row items-center gap-x-3 hover:bg-zinc-800 rounded-lg px-3 py-2">
        {message.author.avatar ? (
          <img className="w-12 h-12 rounded-full" src={message.author.avatar} />
        ) : (
          <span className="w-12 h-12 text-xl font-bold flex items-center justify-center rounded-full bg-rose-600">
            {message.author.global_name.at(0)}
          </span>
        )}

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

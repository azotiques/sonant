import MessageList from "@/app/channels/[channelId]/MessageList";
import ChatInput from "./ChatInput";
import { getChannelById, getMessages, getUser } from "@/app/_utils/actions";
import { redirect } from "next/navigation";

async function Page({ params }) {
  const { channelId } = await params;
  const [{ message }, { channel }, { userAccount }] = await Promise.all([
    getMessages(channelId),
    getChannelById(channelId),
    getUser(),
  ]);

  if (
    !channel?.recepients ||
    channel?.recepients.includes(userAccount.id) === false
  )
    redirect(`/channels`);

  return (
    <div className="flex h-full min-w-0 flex-col justify-between bg-zinc-950 px-5 py-4">
      <MessageList channelId={channelId} message={message} />

      <ChatInput channelId={channelId} />
    </div>
  );
}

export default Page;

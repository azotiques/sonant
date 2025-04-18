import MessageList from "@/app/channels/[channelId]/MessageList";
import ChatInput from "./ChatInput";
import {
  checkChannel,
  getChannel,
  getChannelById,
  getMessages,
  getUser,
} from "@/app/_utils/actions";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";

async function Page({ params }) {
  const { channelId } = await params;
  const { message } = await getMessages(channelId);
  const { channel } = await getChannelById(channelId);
  const { userAccount } = await getUser();

  if (
    !channel?.recepients ||
    channel?.recepients.includes(userAccount.id) === false
  )
    redirect(`/channels`);

  return (
    <div className="h-[calc(100vh-39px)] bg-neutral-900 flex flex-col justify-between px-5 py-4">
      <MessageList channelId={channelId} message={message} />

      <ChatInput channelId={channelId} />
    </div>
  );
}

export default Page;

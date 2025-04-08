import Chatroom from "@/components/Chatroom";
import getAllLinks from "@/libs/getAllLinks";
import { ILink } from "@/model/link";
import { Suspense } from "react";
import Loading from "@/app/loading";
import Chat from "@/components/Chat";
import { notFound } from "next/navigation";

// export async function generateStaticParams(){
//   const messages:IMessage[] = await getAllMessages();
//   return messages.map((message: IMessage) => ({
//     slug: message.chatRoomId.toString()
//   }))
// }

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params

  const links: ILink[] = await getAllLinks();
  const validChatRoomIds = links.map(link => link.linkId.toString());
  if (!validChatRoomIds.includes(slug)) {
    return notFound();
  }

  return (
    <Suspense fallback={<Loading />}>
      <div>
        <Chat slug={slug}/>
      </div>
    </Suspense>
  )
}

export default page
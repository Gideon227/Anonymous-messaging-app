import Chatroom from "@/components/Chatroom";
import getAllMessages from "@/libs/getAllMessages";
import { IMessage } from "@/model/messages";
import { Suspense } from "react";
import Loading from "@/app/loading";

// export async function generateStaticParams(){
//   const messages:IMessage[] = await getAllMessages();
//   return messages.map((message: IMessage) => ({
//     slug: message.chatRoomId.toString()
//   }))
// }

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params

  return (
    <Suspense fallback={<Loading />}>
      <div>
        <Chatroom slug={slug} />
      </div>
    </Suspense>
  )
}

export default page
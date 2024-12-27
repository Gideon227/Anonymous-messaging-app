import Chatroom from "@/components/Chatroom";
import getAllMessages from "@/libs/getAllMessages";
import { IMessage } from "@/model/messages";

export async function generateStaticParams(){
  const messages:IMessage[] = await getAllMessages();
  return messages.map((message: IMessage) => ({
    slug: message.chatRoomId.toString()
  }))
}

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params

  return (
    <div>
      <Chatroom slug={slug} />
    </div>
  )
}

export default page
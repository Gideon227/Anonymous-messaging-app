import { connectToDB } from "@/utils/database";
import Message from "@/model/messages";

export const GET = async ( request: Request, { params }: { params: { chatRoomId: string }}) => {
    try {
        await connectToDB()

        const { chatRoomId } = await params
        const getChatRoomMessages = await Message.find({ chatRoomId: chatRoomId }).populate('senderId', 'username avatar');
        
        return new Response(JSON.stringify(getChatRoomMessages), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch a user", { status: 500 }) 
    }
}
import { connectToDB } from "@/utils/database";
import Message from "@/model/messages";
import { NextRequest } from "next/server";

export const GET = async ( request: NextRequest, { params }: { params: { chatRoomId: string }}) => {
    try {
        await connectToDB()

        const { chatRoomId } = params
        const getChatRoomMessages = await Message.find({ chatRoomId }).populate('senderId', 'username avatar');
        
        return new Response(JSON.stringify(getChatRoomMessages), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch a user", { status: 500 }) 
    }
}
import { connectToDB } from "@/utils/database";
import Message from "@/model/messages";

export const POST = async (request: Request) => {

    const { chatRoomId, message, senderId } = await request.json()
    try {
        await connectToDB()

        const newMessage = new Message({
            chatRoomId,
            message,
            senderId
        })
        await newMessage.save()
        console.log("new message added")

        return new Response(JSON.stringify(newMessage), { status: 201 })
    } catch (error) {    
        console.log(error)
        return new Response("Failed to create a new message",{ status: 500 })
    }
}

export const GET = async (request:Request) => {
    try {
        connectToDB()
        
        const messages = await Message.find()

        if(!messages){
            console.log('No Message Found!')
        }
        
        return new Response(JSON.stringify(messages), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Failed to fetch all Messages", { status: 500 })
    }
}
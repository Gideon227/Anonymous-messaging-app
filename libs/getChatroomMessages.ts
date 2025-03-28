import { IMessage } from "@/model/messages"

export default async function getAllChatroomMessages(chatRoomId: string): Promise<IMessage[]> {
    const response = await fetch(`/api/messages/${chatRoomId}`)
    if (!response.ok) throw new Error('failed to fetch Messages')
    
    return response.json()      
}
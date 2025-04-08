interface FormData {
    chatRoomId: string;
    message: string;
    senderId: string;
    senderName: string;
}

export default async function sendMessage(data: FormData) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/messages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chatRoomId: data.chatRoomId,
                message: data.message,
                senderId: data.senderId,
                senderName: data.senderName
            })
        })

        if(response.ok){
            console.log('New Message Added')
        }else {
            console.error('Failed to create new message', await response.text());
        }

    } catch (error) {
        console.log(error)
    }
}
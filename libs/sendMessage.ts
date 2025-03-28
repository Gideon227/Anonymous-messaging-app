interface FormData {
    chatRoomId: string;
    message: string;
    senderId: string;
}

export default async function sendMessage(data: FormData) {
    try {
        const response = await fetch(`/api/messages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chatRoomId: data.chatRoomId,
                message: data.message,
                senderId: data.senderId
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
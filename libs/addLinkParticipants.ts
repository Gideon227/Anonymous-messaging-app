export default async function addLinkParticipants(linkId: string, userId: string){
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/links/${encodeURIComponent(linkId)}/participants`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                userId
            })
        })
        if (!response.ok) throw new Error('failed to fetch User')
    
        return response.json() 
    } catch (error) {
        console.log(error)   
    }
}
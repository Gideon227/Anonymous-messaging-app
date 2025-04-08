export default async function updateUser( username: string, avatar: number, id: string){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
            username,
            avatar
        }),
    })
    if (!response.ok) throw new Error('failed to fetch User')
    
    return response.json()  
}
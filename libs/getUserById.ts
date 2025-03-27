export default async function getUserById(id: string){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${encodeURIComponent(id)}`, {
        method: 'GET',
    })
    if (!response.ok) throw new Error('failed to fetch User')
    
    return response.json()     
}
export default async function getUserById(id: string){
    const response = await fetch(`/api/users/${encodeURIComponent(id)}`, {
        method: 'GET',
    })
    if (!response.ok) throw new Error('failed to fetch User')
    
    return response.json()     
}
export default async function getSingleUser(username: string){
    const response = await fetch(`/api/users?username=${encodeURIComponent(username)}`, {
        method: 'GET',
    })
    if (!response.ok) throw new Error('failed to fetch User')
    
    return response.json()     
}
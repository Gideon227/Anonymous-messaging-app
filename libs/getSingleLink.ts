export default async function getSingleLink(linkId: string){
    const response = await fetch(`/api/links?link=${encodeURIComponent(linkId)}`, {
        method: 'GET',
    })
    if (!response.ok) throw new Error('failed to fetch Link')
    
    return response.json()     
}
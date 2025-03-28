export default async function getSingleLink(linkId: string){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/links?link=${encodeURIComponent(linkId)}`, {
        method: 'GET',
    })
    if (!response.ok) throw new Error('failed to fetch Link')
    
    return response.json()     
}
export default async function getAllLinks() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/links/all`, {
        method: 'GET'
    });
    if (!response.ok) throw new Error('Failed To Fetch All Messages')
    
    return response.json()     
  }
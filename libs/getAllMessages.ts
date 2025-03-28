export default async function getAllMessages() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/messages`, {
        method: 'GET'
    });
    if (!response.ok) throw new Error('Failed To Fetch All Messages')
    
    return response.json()     
  }
export default async function addLinkPassword(linkId: string, password: string){
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/links/${encodeURIComponent(linkId)}/password`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                password
            })
        })
        
        if (!response.ok) throw new Error('failed to fetch User')
        console.log(`password: ${password} added`)
        return response.json() 
        
    } catch (error) {
        console.log(error)   
    }
}
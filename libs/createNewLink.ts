export default async function createNewLink( linkId: string, userId: string ) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/links`, {
            method: 'POST',
            body: JSON.stringify({
                linkId: linkId,
                userId: userId
            })
        })

        if(response.ok){
            console.log('New User Added')
        }else {
            console.error('Failed to create profile', await response.text());
        }
        
    } catch (error) {
        console.log(error)
    }
}
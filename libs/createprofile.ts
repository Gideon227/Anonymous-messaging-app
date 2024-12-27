
export default async function createProfile(data: { userName: string, avatar: number }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/new`, {
            method: 'POST',
            body: JSON.stringify({
                username: data.userName,
                avatar: data.avatar
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
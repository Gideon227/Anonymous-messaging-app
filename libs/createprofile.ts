
export default async function createProfile(data: { username: string, avatar: number }) {
    try {
        const response = await fetch(`/api/users/new`, {
            method: 'POST',
            body: JSON.stringify({
                username: data.username,
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
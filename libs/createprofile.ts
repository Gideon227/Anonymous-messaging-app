import { IUser } from '@/model/user';

export default async function createProfile(data: { username: string, avatar: number }):Promise<IUser> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/new`, {
        method: 'POST',
        body: JSON.stringify({
            username: data.username,
            avatar: data.avatar
        })
    })

    if (!response.ok) throw new Error('Failed To Fetch All Messages')
    return response.json()         
}
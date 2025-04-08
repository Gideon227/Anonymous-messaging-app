"use client"
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import getSingleLink from '@/libs/getSingleLink';
import Chatroom from './Chatroom';
import Password from './Password';
import Loading from '@/app/loading';
import getSingleUser from '@/libs/getSingleUser';
import { Types } from 'mongoose';

interface Profile {
    userId: string;
    username: string;
    avatar: number;
}

interface IUser{
    _id: string;
    username: string;
    avatar: number,
    linksCreated?: Types.ObjectId[], 
    createdAt: Date;
}
  
const Chat = ({ slug }: { slug: string }) => {
    const router = useRouter()
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<IUser | null>(null)

    useLayoutEffect(() => {
        //check if the user is part of the participants, if he is not, take him to password, otherwise take him to chatroom
        (async () => {
            const profileFromLocalStorage = localStorage.getItem('profile');
            if (!profileFromLocalStorage) {
                return router.push(`/create-profile?redirect=/chatroom/${slug}`);
            }

            let profile: Profile;
            try {
                profile = JSON.parse(profileFromLocalStorage);
            } catch {
                localStorage.removeItem('profile');
                return router.push(`/create-profile?redirect=/chatroom/${slug}`);
            }

            try {
                const user = await getSingleUser(profile.username)
                setUser(user)
                const link = await getSingleLink(slug);
                
                const isInChatroom = link.participants.includes(profile.userId)
                console.log(isInChatroom)
                setIsAuthorized(isInChatroom)
                
            } catch (error) {
                console.log(error)
                router.replace(`/create-profile?redirect=/chatroom/${slug}`);
            } finally {
                setLoading(false)
            }    
        })()
    },[slug, router])

    if (loading) {
        return <Loading />;
    }

    return isAuthorized ? (
        <Chatroom slug={slug!} />
      ) : user ? (
        <Password slug={slug!} userId={user._id} />
      ) : null;

}

export default Chat
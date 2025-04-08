"use client"
import React, { useState, useLayoutEffect } from 'react'
import CreatePassword from '@/components/CreatePassword';
import { useRouter } from 'next/navigation';
import getSingleLink from '@/libs/getSingleLink';

interface Profile {
    userId: string;
    userName: string;
    avatar: number;
}

const SetPassword = ({ slug }: { slug: string }) => {
    const router = useRouter();
    const [authorized, setAuthorized] = useState<boolean>(false);
  
    useLayoutEffect(() => {
      if (!slug) return;
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
          return router.push(`/create-profile?redirect=/chatroom/${slug}/set-password`);
        }
        try {
          const link = await getSingleLink(slug);
          if (profile.userId !== link.createdBy) {
            return router.push(`/chatroom/${slug}?redirect=/chatroom/${slug}/set-password`);
          }
          
          setAuthorized(true);
        } catch (err) {
          console.error('Link fetch/validation failed', err);
          router.replace(`/chatroom/${slug}?redirect=/chatroom/${slug}/password`);
        }
  
      })()
    
    }, [slug, router])
    
  
    if (!authorized) return null;
  
    return <CreatePassword linkId={slug!} />
}

export default SetPassword
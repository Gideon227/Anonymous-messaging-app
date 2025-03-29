"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'
import BoxContent from './BoxContent';
// import { useRouter } from "next/navigation";
import { useRouter } from 'next-nprogress-bar';
import createUniqueLinkId from "@/libs/createlink";
import createNewLink from "@/libs/createNewLink";
import getSingleUser from "@/libs/getSingleUser";
import Loading from '@/app/loading';

interface Profile {
  username: string;
  avatar: number;
}

export const Hero = () => {
  const router = useRouter();
  const [renderLink, setRenderLink] = useState('');
  const [loading, setLoading] = useState(false)
  
    useEffect(() => {
      const profileFromLocalStorage = localStorage.getItem("profile");
      const profile: Profile | null = profileFromLocalStorage
        ? JSON.parse(profileFromLocalStorage)
        : null;
  
      if (profile) {
        (async () => {
          try {
            setLoading(true)
            const chatRoomLink = await createUniqueLinkId();
            const userId = await getSingleUser(profile.username);
            await createNewLink(chatRoomLink, userId._id);
            setRenderLink(`/chatroom/${chatRoomLink}`)
          } catch (error) {
            console.error("Failed to create chat room link", error);
          } finally{
            setLoading(false)
          }
        })();
      } else {
        setRenderLink("/create-profile");
      }
    }, []);

    const buttonLink = () => {
      router.push(renderLink)
    }

    if(loading){
      <Loading />
    }

  return (
    <section >
      <div className='grid grid-cols-2 max-lg:grid-cols-1 gap-6 px-10 pt-8 max-lg:px-4 max-md:pt-6'>
        <div className='py-20 px-6 space-y-5 max-lg:space-y-3 max-md:py-10 max-md:px-2 pr-4'>
          <h1 className='text-[40px] font-semibold text-[#131313] italic leading-[3rem] max-lg:text-[27px] max-md:leading-9'>
            Start Chatting With<br /> Anyone, Anywhere<br /> While Protecting Your Privacy
          </h1>
          <p className='text-[14px] font-normal text-[#12141D] leading-6 md:pr-32'>Experience true anonymity with every chat. Our platform ensures that you can connect all without revealing your identity. No sign-ups, no personal data required.</p>

          <div>
            <button onClick={() => buttonLink()} className='bg-[#2B59FF] py-3 px-6 rounded-sm text-[14px] font-normal text-white max-md:px-4'>
              Start chatting now
            </button>
          </div>

          <div className='flex space-between md:pr-8 pr-4 md:pt-6'>
            <Image src='/Frame 5.png' width={50} height={20} alt='people'/>
          </div>
        </div>
        <div className='max-lg:order-first relative'>
            <BoxContent text={'Great software that allows you to chat anonymously from any place at any time without any interruption.'} name={'Anonymous user'} className="absolute bottom-2 -left-60 max-md:-left-10 max-md:-bottom-5"/>
            <Image src='/hero.png' width={300} height={300} alt='hero section image' objectFit='cover' className='md:hidden' />
            <Image src='/hero.png' width={400} height={200} alt='hero section image' objectFit='cover' className='max-md:hidden' />
            <BoxContent text={'Great software that allows you to chat anonymously from any place at any time without any interruption.'} name={'Genuine character'} className="absolute bottom-32 -right-10 max-md:-right-10 max-md:bottom-28"/>
        </div>
      </div>
    </section>
  )
}
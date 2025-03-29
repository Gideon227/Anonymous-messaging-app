"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { useRouter } from 'next-nprogress-bar';
import createUniqueLinkId from "@/libs/createlink";
import createNewLink from "@/libs/createNewLink";
import getSingleUser from "@/libs/getSingleUser";
import Loading from '@/app/loading';

interface Profile {
  username: string;
  avatar: number;
}

const Navbar = () => {
    const router = useRouter()
    const [renderLink, setRenderLink] = useState("")
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
    <header className='md:py-4 md:px-16'>
        <div className='flex justify-between items-center md:px-4 py-2'>
            <Link href='/' className='italic font-semibold text-black text-[14px] max-md:text-[12px] flex items-center justify-center inset-y-3.5'>
              <Image src='/logo.png' alt='logo' className='px-1 mb-[1px]' width={37} height={30} color='#2B59FF'/>
              ANONYMOUS
            </Link>

            <button onClick={() => buttonLink()} className='max-lg:hidden bg-[#2B59FF] py-2 px-6 rounded-sm text-[13px] font-normal text-white max-md:px-4'>Create chatroom</button>

            <button onClick={() => buttonLink()} className='lg:hidden'>
              <HiOutlineChatBubbleLeftRight size={20} color='#2B59FF'/>
            </button>
        </div>
    </header>
  )
}

export default Navbar
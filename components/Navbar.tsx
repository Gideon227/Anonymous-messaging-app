"use client"
import { useState, useEffect, useLayoutEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { useRouter } from 'next-nprogress-bar';
import createUniqueLinkId from "@/libs/createlink";
import createNewLink from "@/libs/createNewLink";
import getSingleUser from "@/libs/getSingleUser";
import Loading from '@/app/loading';
import { avatars } from '@/constants';
import ChangeUserInfo from './ChangeUserInfo';


interface Profile {
  username: string;
  avatar: number;
}

const Navbar = () => {
    const router = useRouter()
    const [renderLink, setRenderLink] = useState("")
    const [loading, setLoading] = useState(false)
    const [userInfo, setuserInfo] = useState<any>(null)
    const [modal, setModal] = useState<boolean>(false)
      
    useLayoutEffect(() => {
      const profileFromLocalStorage = localStorage.getItem("profile");
      const profile: Profile | null = profileFromLocalStorage
        ? JSON.parse(profileFromLocalStorage)
        : null;
      
      if (profile) {
        (async () => {
          try {
            setLoading(true)
            const chatRoomLink = await createUniqueLinkId();
            const user = await getSingleUser(profile.username);
            setuserInfo(user)
            await createNewLink(chatRoomLink, user._id);
            setRenderLink(`/chatroom/${chatRoomLink}/set-password`)
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

    const userAvatar = avatars.find((avatar) => avatar.id === userInfo?.avatar); 
  return (
    <header className='md:py-4 md:px-16'>
        <div className='flex justify-between items-center md:px-4 py-2'>
            <Link href='/' className='italic font-semibold text-black text-[14px] max-md:text-[12px] flex items-center justify-center inset-y-3.5'>
              <Image src='/logo.png' alt='logo' className='px-1 mb-[1px]' width={37} height={30} color='#2B59FF'/>
              ANONYMOUS
            </Link>


            <div className='flex space-x-7 max-md:space-x-4 items-center justify-center'>
              <button onClick={() => buttonLink()} className='max-lg:hidden bg-[#2B59FF] py-2 px-6 rounded-sm text-[13px] font-normal text-white max-md:px-4'>Create chatroom</button>

              <button onClick={() => buttonLink()} className='lg:hidden'>
                <HiOutlineChatBubbleLeftRight size={20} color='#2B59FF'/>
              </button>

              {userAvatar && (
                  <>
                     <button onClick={() => setModal(true)} className='p-2 rounded-full bg-blue-600 hover:bg-blue-400 flex justify-center items-center shadow-sm max-md:hidden'>{userAvatar && <userAvatar.image size={16} color='#fff' className='mb-[1px]'/>}</button>
                    <button onClick={() => setModal(true)} className='p-[5px] rounded-full bg-blue-600 hover:bg-blue-400 flex justify-center items-center shadow-sm md:hidden'>{userAvatar && <userAvatar.image size={12} color='#fff' className='mb-[1px]'/>}</button>
                  </>
                )
              }
             </div>      
        </div>
        {modal && (<ChangeUserInfo params={userInfo?._id} modal={setModal}/>)}
    </header>
  )
}

export default Navbar
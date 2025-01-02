import React from 'react'
import { CgProfile } from "react-icons/cg";
import { IoChatbubblesOutline } from "react-icons/io5";
import { IoIosLink } from "react-icons/io";

const Main = () => {
  return (
    <div className='py-20 max-lg:py-6 px-4 flex flex-col items-center justify-center text-center space-y-12 max-md:space-y-4'>
        <h1 className='text-[#2A2827] font-bold text-[32px]'>How it works</h1>
        <div className='flex justify-between items-center gap-6 px-12 max-md:flex-col w-full lg:h-[275px] max-md:px-2'>
            <div className='shadow rounded-lg border border-[#e5e7eb] w-full h-full items-center justify-center flex flex-col px-7 max-md:py-14 max-md:px-5'>
                <span className='pb-4'><CgProfile size={27}/></span>
                <h1 className='text-[20px] text-zinc-900 font-semibold max-md:text-[16px]'>Set Up Your Profile</h1>
                <p className='text-[14px] mt-1 leading-6 text-gray-600 font-medium max-md:text-[12px] max-md:leading-4'>Select a unique username that reflects your personality and choose an avatar that best represents you in the chatroom, engage with others while maintaining your anonymity and personal style.</p>
            </div>
            <div className='shadow rounded-lg border border-[#e5e7eb] w-full h-full items-center justify-center flex flex-col px-7 max-md:py-14 max-md:px-5'>
                <span className='pb-4'><IoIosLink size={27}/></span>
                <h1 className='text-[20px] text-zinc-900 font-semibold max-md:text-[16px]'>Create Your Chat Room</h1>
                <p className='text-[14px] mt-1 leading-6 text-gray-600 font-medium max-md:text-[12px] max-md:leading-4'>Create a unique link for your chat room with just one simple click, instantly setting up a secure space to engage in private, anonymous conversations without any hassle.</p>
            </div>
            <div className='shadow rounded-lg border border-[#e5e7eb] w-full h-full items-center justify-center flex flex-col px-7 max-md:py-14 max-md:px-5'>
                <span className='pb-4'><IoChatbubblesOutline size={27}/></span>
                <h1 className='text-[20px] text-zinc-900 font-semibold max-md:text-[16px]'>Share and Start Chatting</h1>
                <p className='text-[14px] mt-1 leading-6 text-gray-600 font-medium max-md:text-[12px] max-md:leading-4'>Share the personalized link you have generated with friends, family, or anyone you wish to chat with, giving them easy access to your private, anonymous chat room.</p>
            </div>
        </div> 

        
    </div>
  )
}

export default Main
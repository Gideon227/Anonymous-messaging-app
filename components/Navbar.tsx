import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";


const Navbar = () => {
  return (
    <header className='md:py-4 md:px-16'>
        <div className='flex justify-between items-center md:px-4 py-2'>
            <Link href='/' className='italic font-semibold text-black text-[14px] max-md:text-[12px] flex items-center justify-center inset-y-3.5'>
              <Image src='/logo.png' alt='logo' className='px-1 mb-[1px]' width={37} height={30} color='#2B59FF'/>
              ANONYMOUS
            </Link>

            <Link href='/create-profile' className='max-lg:hidden bg-[#2B59FF] py-2 px-6 rounded-sm text-[13px] font-normal text-white max-md:px-4'>Create chatroom</Link>

            <div className='lg:hidden'>
              <HiOutlineChatBubbleLeftRight size={20} color='#2B59FF'/>
            </div>
        </div>
    </header>
  )
}

export default Navbar
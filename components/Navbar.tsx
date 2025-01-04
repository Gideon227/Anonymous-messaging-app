import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <header className='py-4 px-16'>
        <div className='flex justify-between items-center px-4 py-2'>
            <Link href='/' className='italic font-semibold text-[#452b1a] text-[25px]'>ANONYMOUS</Link>

            <Link href='/create-profile' className='border-[1.5px] py-3 px-6 border-[#2A2827] rounded-full text-[14px] font-medium text-[#2A2827]'>Create Chatroom</Link>
        </div>
    </header>
  )
}

export default Navbar
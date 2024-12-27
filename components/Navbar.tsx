import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <header className='p-4'>
        <div className='flex justify-between items-center px-4 py-2'>
            <Link href='/' className='italic font-semibold text-[#452b1a] text-[25px]'>ANONYMOUS</Link>
            <Link href='/create-profile' className='border-[1.5px] py-2 px-5 border-[#452b1a] text-[13px] font-medium'>Create Chatroom</Link>
        </div>
    </header>
  )
}

export default Navbar
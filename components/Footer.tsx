import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className='border-t-2 w-screen py-10 max-md:py-6 flex justify-center items-center'>
        <h1 className='text-[16px] text-zinc-500'>Built by <Link href='/' className='text-gray-900 font-medium'>Gideon</Link> | Codebase is open-source on <Link href='/' className='text-gray-900 font-medium'>Github</Link></h1>
    </div>
  )
}

export default Footer
import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className='border-t border-zinc-200 w-screen py-8 max-md:py-6 flex justify-center items-center'>
        <h1 className='text-[13px] text-zinc-500 font-normal'> Codebase is open-source on <Link href='https://github.com/Gideon227/Anonymous-messaging-app' className='text-gray-900 font-medium'>Github</Link></h1>
    </div>
  )
}

export default Footer
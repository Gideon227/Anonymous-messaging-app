import React from 'react'

const Main = () => {
  return (
    <div className='py-20 max-lg:py-6 px-4 flex flex-col items-center justify-center text-center space-y-12 max-md:space-y-4'>
        <h1 className='text-[rgb(64,64,64)] text-[24px] font-semibold'>Quickstart</h1>
        <div className='flex justify-between items-center gap-6 px-8 max-md:flex-col w-full h-[250px] max-md:px-2'>
            <div className='border-2 shadow border-zinc-300 rounded-xl w-full h-full items-center justify-center flex flex-col space-y-2 px-5 max-md:py-14 max-md:px-3 '>
                <h1 className='text-[20px] text-zinc-900 font-semibold max-md:text-[17px]'>Set Up Your Profile</h1>
                <p className='text-[15px] leading-6 text-gray-600 font-medium max-md:text-[13px] max-md:leading-5'>Choose a unique username and an avatar to represent you in the chatroom </p>
            </div>

            <div className='border-2 shadow border-zinc-300 rounded-xl w-full h-full items-center justify-center flex flex-col space-y-2 px-5 max-md:py-14 max-md:px-3 '>
                <h1 className='text-[20px] text-zinc-900 font-semibold max-md:text-[17px]'>Create Your Chat Room</h1>
                <p className='text-[15px] leading-6 text-gray-600 font-medium max-md:text-[13px] max-md:leading-5'>Generate a unique link for your chat room in just one click </p>
            </div>

            <div className='border-2 shadow border-zinc-300 rounded-xl w-full h-full items-center justify-center flex flex-col space-y-2 px-5 max-md:py-14 max-md:px-3 '>
                <h1 className='text-[20px] text-zinc-900 font-semibold max-md:text-[17px]'>Share and Start Chatting</h1>
                <p className='text-[15px] leading-6 text-gray-600 font-medium max-md:text-[13px] max-md:leading-5'>Share the generated link with friends or others you’d like to chat with.</p>
            </div>
        </div>
    </div>
  )
}

export default Main
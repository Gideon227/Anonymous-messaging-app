"use client"
import { useState } from 'react'
import { useRouter } from "next/navigation";
import { avatars } from '@/constants'
import createUniqueLinkId from '@/libs/createlink';
import createProfile from '@/libs/createprofile'
import createNewLink from '@/libs/createNewLink';
import getSingleUser from '@/libs/getSingleUser';

const Setup = () => {
  const [formData, setFormData] = useState({
    userName: '',
    avatar: 0
  })
  const router = useRouter()

  const handleSubmit = async () => {
    if (!formData.userName || formData.avatar === 0) {
      alert("Please select a username and an avatar.");
      return;
    }

    await createProfile(formData);
    alert("Profile created successfully!");
    localStorage.setItem("profile", JSON.stringify({userName: formData.userName, avatar: formData.avatar}));
    const chatRoomLink = await createUniqueLinkId()
    const userId = await getSingleUser(formData.userName)
    await createNewLink(chatRoomLink, userId._id )
    router.push(`/chatroom/${chatRoomLink}`)
  }

  return (
    <div className='flex flex-col justify-between min-h-screen'>
      <div className='w-auto flex flex-col space-y-10 items-center justify-center'>
        <form 
          className='flex flex-col space-y-2'
          onSubmit={(e) => e.preventDefault()}
          >
          <label className='font-semibold text-[17px] text-center'>Select A UserName:</label>
          <input 
            type='text'
            required
            value={formData.userName}
            onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
            className='lg:w-96 w-44 flex border rounded-md mt-2 mb-8 p-3 text-sm text-gray-800 font-medium outline-0 '
          />
        </form>
        <div className='items-center flex flex-col space-y-4'>
          <h1 className='font-semibold text-[17px] text-start'>Select An Avatar</h1>
          <div className='space-x-6 mt-2'>
            {avatars.map((avatar) => (
              <button 
                key={avatar.id} 
                onClick={() => setFormData({ ...formData, avatar: avatar.id })} 
                className={`rounded-full bg-gray-200 p-6 hover:bg-gray-400 ${avatar.id === formData.avatar && 'bg-gray-400'}`}>
                  <avatar.image size={35} /> 
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className='absolute right-20 bottom-20'>
        <button 
          onClick={() => handleSubmit()} 
          className='bg-[#452b1a] mx-1 hover:bg-[#fff] border hover:text-black text-white border-[#452b1a] py-2.5 px-12 text-[16px] font-medium rounded'>
            Create Profile
        </button>
      </div>
    </div>
  )
}

export default Setup
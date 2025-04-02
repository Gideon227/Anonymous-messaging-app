"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from "next/navigation";
import { avatars } from '@/constants';
import createUniqueLinkId from '@/libs/createlink';
import createProfile from '@/libs/createprofile'
import createNewLink from '@/libs/createNewLink';
import getSingleUser from '@/libs/getSingleUser';

const Setup = () => {
  const [formData, setFormData] = useState({
    username: '',
    avatar: 0
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams(); // Get query parameters
  const redirectFromLink = searchParams?.get("redirect");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("handleSubmit triggered");
    if (!formData.username || formData.avatar === 0) {
      alert("Please select a username and an avatar.");
      return;
    }

    try {
      setLoading(true)
      await createProfile(formData);
      localStorage.setItem(
        "profile",
        JSON.stringify({ username: formData.username, avatar: formData.avatar })
      );

      if (redirectFromLink) {
        router.push(redirectFromLink);
      } else {
        const chatRoomLink = await createUniqueLinkId();
        const userId = await getSingleUser(formData.username);
        await createNewLink(chatRoomLink, userId._id);
        router.push(`/chatroom/${chatRoomLink}`);
      }
    } catch (error) {
      console.error("Failed to create profile and redirect", error);
    } finally{
      setLoading(false)
    }

  }

  return (
    <div className='flex flex-col justify-between min-h-screen pt-32'>
      <div className='w-auto flex flex-col space-y-10 items-center justify-center'>
        <div 
          className='flex flex-col space-y-2'
          >
          <label className='font-semibold text-[17px] text-center max-sm:text-[14px]'>Select a Username as your display name:</label>
          <input 
            type='text'
            required
            maxLength={20}
            placeholder='username...'
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className='lg:w-96 border w-full flex rounded-sm mt-2 mb-8 px-3 py-2 text-sm text-gray-800 font-medium outline-0 text-[16px] lg:placeholder:text-[14px] lg:placeholder:font-normal'
          />
        </div>
        <div className='items-center justify-center flex flex-col space-y-5 max-md:space-y-3'>
          <h1 className='font-semibold text-[17px] text-start max-sm:text-[14px]'>Select an Avatar as your profile picture</h1>
          <div className='space-x-8 md:mt-2 max-md:space-x-2'>
            {avatars.map((avatar) => (
              <button 
                key={avatar.id} 
                onClick={() => setFormData({ ...formData, avatar: avatar.id })} 
                className={`p-1 ${avatar.id === formData.avatar && 'border_style rounded-full'}`}>
                  <div className={`max-md:hidden rounded-full bg-gray-300 p-3 hover:bg-gray-400 ${avatar.id === formData.avatar && ''}`}>
                    <avatar.image size={26} /> 
                  </div>
                  <div className={`md:hidden rounded-full bg-gray-300 p-2 hover:bg-gray-400 ${avatar.id === formData.avatar && ''}`}>
                    <avatar.image size={17} /> 
                  </div>
              </button>
            ))}
          </div>
        </div>

        <div className='mt-2'>
          <button 
            onClick={(e) => handleSubmit(e)} 
            disabled={loading}
            className='bg-[#2B59FF] flex items-center justify-center mx-1 border text-white border-[#2B59FF] py-2 px-10 text-[14px] font-normal rounded disabled:opacity-60'>
              Create profile
              {loading && (<div className="ml-4 w-4 h-4 border-2 border-white-500 border-t-transparent rounded-full animate-spin"></div>)}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Setup
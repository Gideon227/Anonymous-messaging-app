"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from "next/navigation";
import { avatars } from '@/constants';
import createUniqueLinkId from '@/libs/createlink';
import createProfile from '@/libs/createprofile'
import createNewLink from '@/libs/createNewLink';
import getSingleUser from '@/libs/getSingleUser';
import { IUser } from '@/model/user';
import debounce from 'lodash.debounce';

const Setup = ({ linkId }: { linkId: string }) => {
  const [formData, setFormData] = useState({
    username: '',
    avatar: 0
  })
  const [loading, setLoading] = useState(false)
  const [usernameError, setUsernameError] = useState('');
  const [checkingUsername, setCheckingUsername] = useState(false);

  const router = useRouter()
  const searchParams = useSearchParams(); // Get query parameters
  const redirectFromLink = searchParams?.get("redirect") || null;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("handleSubmit triggered");
    if (!formData.username || formData.avatar === 0) {
      toast.error("Please select a username and an avatar.", {
        style: {
            fontSize: "14px",
        }
      })
      return;
    }

    if (usernameError) {
      toast.error("Please choose a different username.");
      return;
    }    

    try {
      setLoading(true)
      const existingUser = await getSingleUser(formData.username)
      if (existingUser) {
        toast.error("Username already taken. Please choose another.", {
          style: { fontSize: "14px" }
        });
        return;
      }

      const user: IUser = await createProfile(formData);
      localStorage.setItem(
        "profile",
        JSON.stringify({ userId: user._id, username: formData.username, avatar: formData.avatar })
      );

      if (redirectFromLink) {
        router.push(redirectFromLink);  
      } else {
        // const chatRoomLink = await createUniqueLinkId();
        const userId = await getSingleUser(formData.username);
        await createNewLink(linkId, userId._id);
        router.push(`/chatroom/${linkId}/set-password`);
      }
      toast.success("Profile successfully created", {
        style: {
            fontSize: "14px",
        }
      })
    } catch (error) {
      console.error("Failed to create profile and redirect", error);
    } finally{
      setLoading(false)
    }

  }

  const checkUsernameAvailability = debounce(async (username: string) => {
    if (!username) return;
    setCheckingUsername(true);
    try {
      const existingUser = await getSingleUser(username);
      if (existingUser) {
        setUsernameError("Username is already taken");
      } else {
        setUsernameError("");
      }
    } catch (err) {
      setUsernameError("");
    } finally {
      setCheckingUsername(false);
    }
  }, 500); 
  

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
            onChange={(e) => {
              const value = e.target.value;
              setFormData({ ...formData, username: value });
              setUsernameError('');
              checkUsernameAvailability(value);
            }}
            
            className='lg:w-96 border w-full flex rounded-sm mt-2 mb-8 px-3 py-2 text-sm text-gray-800 font-medium outline-0 text-[16px] lg:placeholder:text-[14px] lg:placeholder:font-normal'
          />
          {usernameError && (<p className="text-red-500 text-xs -mt-1">{usernameError}</p>)}
          {checkingUsername && (<p className="text-zinc-500 text-xs -mt-1">Checking availability...</p>)}
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
              {loading? 'Creating' : 'Create profile'}
              {loading && (<div className="ml-4 w-4 h-4 border-2 border-white-500 border-t-transparent rounded-full animate-spin"></div>)}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Setup
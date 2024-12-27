"use client"
import { useState, useEffect } from 'react';
import { IMessage } from '@/model/messages';
import getAllChatroomMessages from '@/libs/getChatroomMessages';
import getSingleUser from '@/libs/getSingleUser';
import sendMessage from '@/libs/sendMessage';
import { VscSend } from "react-icons/vsc";
import MessageBox from './MessageBox';
import { IoShareSocial } from "react-icons/io5";
import { avatars, Avatar } from "@/constants";
import { RxCross2 } from 'react-icons/rx';
import { PiLinkSimpleLight } from "react-icons/pi";

const Conversation = ( { slug }: { slug: string } ) => {
    const [messages, setMessages] = useState<IMessage[]>([])
    const [info, setInfo] = useState<Profile>({
        username: '',
        avatar: 0
    })
    const [formData, setFormData] = useState<FormData>({
        chatRoomId: slug, 
        message: " ", 
        senderId: " ",
    })
    const [showModal, setShowModal] = useState<boolean>(false)

    interface Profile {
        username: string;
        avatar: number;
    }

    interface FormData {
        chatRoomId: string;
        message: string;
        senderId: string;
    }

    useEffect(() => {
        const fetchData = async () => {
          const profileFromLocalStorage = localStorage.getItem("profile");
          const profile: Profile | null = profileFromLocalStorage
            ? JSON.parse(profileFromLocalStorage)
            : null;
      
          if (profile) {
            try {
              const [user, chatMessages] = await Promise.all([
                getSingleUser(profile.username),
                getAllChatroomMessages(slug),
              ]);
              setInfo(user);
              setFormData((prev) => ({ ...prev, senderId: user._id }));
              setMessages(chatMessages);
              
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          }
        };
      
        fetchData();
      }, [slug]);
      

    const handleClick = async () => {
        if (!formData.chatRoomId || !formData.message || !formData.senderId) {
            console.error("Missing fields in formData.");
            return;
        }
        
        try {
            await sendMessage(formData);
            setFormData((prev) => ({ ...prev, message: "" })); 
          } catch (error) {
            console.error("Failed to send message:", error);
        }
    }
    const userAvatar = avatars.find((avatar) => avatar.id === info.avatar);    

  return (
    <div className='bg-[#F9F6F9] flex flex-col h-screen md:px-12 px-2 relative'>
        <div className='flex justify-between px-2 md:px-4 py-2 items-center max-md:mb-4'>
            <h1 className='text-[18px] text-gray-900 italic font-medium'>Anonymous Chatroom</h1>
            <div className='flex space-x-4 items-center'>
                <button onClick={() => setShowModal(true)} className='rounded-lg py-1 px-3 border-gray-700 border flex items-center space-x-1 text-[13px]'>
                    <IoShareSocial /> 
                    <p>Share</p>
                </button>
                <span className='max-md:hidden p-2 rounded-full bg-gray-300 hover:bg-gray-500'>{userAvatar && <userAvatar.image size={21} />}</span>
            </div>
        </div>
        <div className='md:w-7/12 max-md:w-full flex flex-col justify-center items-start mx-auto'>
            <div className='flex-1 overflow-y-auto md:p-4 max-md:py-4 space-y-4 max-sm:pl-6 max-lg:pl-10 lg:pl-16'>
                <div className="space-y-6">
                    {messages.map((msg) => (
                    <div key={msg._id} className="md:w-[85vh]">
                        <MessageBox message= {msg} user={info} />    
                    </div>
                    ))}
                </div>
            </div>

            <div className='flex flex-col absolute bottom-3 left-0 w-full px-4'>
                <div className='flex justify-between gap-2 max-md:gap-x-[4px] '>
                    <input 
                        type='text'
                        onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                        required
                        value={formData.message}
                        placeholder='Enter your message here...'
                        className='bg-white outline-none border rounded-lg w-full text-gray-700 text-[14px] shadow-sm max-md:hidden placeholder:text-gray-400 font-medium'
                    />

                    <input 
                        type='text'
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        value={formData.message}
                        className='bg-white outline-none border rounded-md w-full text-gray-900 text-[14px] shadow-sm md:hidden px-2.5'
                    />

                    <button onClick={() => handleClick()} className='px-2.5 py-2.5 bg-purple-600 text-white text-[16px] font-bold rounded-md'>
                        <VscSend size={15} />
                    </button>
                </div>

                <p className='text-[11px] max-md:text-[9px] font-light mt-1 text-gray-500 no-wrap mx-auto'>Experience true anonymity with every chat. Keep the chatroom safe</p>
            </div>   
        </div>
        
        {showModal && (
            <div className='flex justify-center items-center fixed z-50 top-0 w-screen h-full overflow-scroll left-0 bg-black bg-opacity-50'>
                <div className='w-1/2 bg-white rounded-lg py-2'>
                    <div className='flex items-center justify-between px-3'>
                        <h1 className='text-[16px] font-semibold text-gray-900 '>Share public link to chat</h1>
                        <button onClick={() => {setShowModal(false)}} className='py-6 relative'>
                            <RxCross2 className='absolute top-3 left-0 text-gray-700' size={24}/>
                        </button>
                    </div>
                
                    <hr className='w-full text-gray-600 opacity-70 h-px'/>

                    <div className='md:mx-12 md:my-8 my-4 mx-2 md:space-y-6 space-y-2'>
                        <p className='text-[16px] font-medium '>Your name, custom instructions, and any messages you add after sharing stay private.</p>
                    </div>

                    <div className='border rounded-[32px]] border-gray-400 pr-2 pl-6 py-1 flex items-center justify-between mx-4 mb-3'>
                        <p className='text-[16px] text-gray-400 font-medium'>{process.env.NEXT_PUBLIC_API_URL}/chatroom/{slug}</p>
                        <button className='rounded-3xl bg-gray-500 gap-1 py-3 px-5 flex items-center'> 
                            <PiLinkSimpleLight color='white' size={14} /> 
                            <p className='text-[16px] text-gray-200 '>Share link</p>
                        </button>
                    </div>

                </div>
            </div>
        )}

    </div>
  )
}

export default Conversation
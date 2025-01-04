"use client"
import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { IMessage } from '@/model/messages';
import getAllChatroomMessages from '@/libs/getChatroomMessages';
import getSingleUser from '@/libs/getSingleUser';
import sendMessage from '@/libs/sendMessage';
import { FaArrowUp } from "react-icons/fa6";
import MessageBox from './MessageBox';
import { IoShareSocial } from "react-icons/io5";
import { avatars, Avatar } from "@/constants";
import { RxCross2 } from 'react-icons/rx';
import { PiLinkSimpleLight } from "react-icons/pi";
import { FaWhatsapp } from "react-icons/fa";
import { FaRegClipboard } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";
import { RiShareForward2Fill } from "react-icons/ri";
import { socket } from '@/libs/socketClient';
import { IUser } from '@/model/user'

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
    const [showSocials, setShowSocials] = useState<boolean>(false)
    const [userDb, setUserDb] = useState<IUser | null>(null);

    const messageEndRef = useRef<HTMLDivElement>(null); 

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

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
        const profileFromLocalStorage = localStorage.getItem("profile");
          
          const profile: Profile = profileFromLocalStorage
            ? JSON.parse(profileFromLocalStorage)
            : null;

        const fetchData = async () => {
      
          if (profile) {
            try {
              const [user, chatMessages] = await Promise.all([
                getSingleUser(profile.username),
                getAllChatroomMessages(slug),
              ]);
              setInfo(user);
              setFormData((prev) => ({ ...prev, senderId: user._id }));
              setMessages(chatMessages);
              scrollToBottom()
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          }
        };

        const fetchUserData = async () => {
              try {
                const getData = await getSingleUser(profile?.username);
                setUserDb(getData);
              } catch (err) {
                console.error("Error fetching user data:", err);
              }
            };
        
            if (profile?.username) {
              fetchUserData();
            }
      
        fetchData();    
      }, []);
      

    useEffect(() => {
        // socket.on("connect", () => {
        //     console.log("Socket connected")
        // })
        socket.emit('joinRoom', `chatroom/${slug}`);
        socket.on("newMessage", (message: IMessage) => {
            setMessages((prevMessages) => [...prevMessages, message]);
            scrollToBottom();
            console.log("listening")
        });
    
        socket.on("disconnect", () => {
            console.log("Socket disconnected")
        })
          
        return () => {
            socket.emit('leaveRoom', `chatroom/${slug}`);
            socket.off("newMessage");
        };
      
      },[])


    const handleClick = async () => {
        if (!formData.chatRoomId || !formData.message || !formData.senderId) {
            console.error("Missing fields in formData.");
            return;
        }
        
        try {
            socket.emit("sendMessage", { room: `chatroom/${slug}`, message: formData?.message, senderId: formData?.senderId })
            await sendMessage(formData);
            setFormData((prev) => ({ ...prev, message: "" })); 
            scrollToBottom();
          } catch (error) {
            console.error("Failed to send message:", error);
        }
    }
    const userAvatar = avatars.find((avatar) => avatar.id === info.avatar); 
    const displayLink = `${process.env.NEXT_PUBLIC_API_URL}/chatroom/${slug}`
    const mobileShareLink = displayLink.substring(0, 20); 
    const shareLink = displayLink.substring(0, 38); 

    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(
    `${displayLink}`)}`
    const twitterLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(displayLink)}&hashtags=${encodeURIComponent(
    'anonymousmessaging'
  )}`
  const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    displayLink
  )}`
  const onClipboardClick = async () => {
    await navigator.clipboard.writeText(displayLink);
    toast.success(`Copied anonymous chatroom link to clipboard`, {
        style: {
            fontSize: "14px",
        }
    })
  }


  return (
    <div className='bg-white flex flex-col h-screen relative'>
        <div className='flex items-center justify-between bg-gray-100 py-4 px-6 fixed top-0 w-full z-10 border-b border-gray-300 md:py-3 md:px-16  max-md:mb-4 border-b-zinc-200 '>
            <h1 className='text-[18px] max-lg:text-[16px] text-gray-900 italic font-medium'>Anonymous Chatroom</h1>
            <div className='flex space-x-6 items-center'>
                <button onClick={() => setShowModal(true)} className='max-md:hidden rounded-full py-1 max-lg:py-1 max-lg:gap-x-1 px-4 border-zinc-500 border flex items-center gap-2 text-[14px] text-zinc-800'>
                    <IoShareSocial /> 
                    <p>Share</p>
                </button>
                <span className='max-md:hidden p-2 rounded-full bg-gray-300 hover:bg-gray-500'>{userAvatar && <userAvatar.image size={21} />}</span>
                <RiShareForward2Fill size={22} className='text-zinc-600 md:hidden' />
            </div>
        </div>
        <div className="lg:w-11/12 max-lg:w-full flex flex-col justify-center mx-auto md:px-12 px-2">
            <div className='flex-1 overflow-hidden py-28 max-md:pt-20 max-md:pb-24 space-y-4 max-sm:px-3 max-lg:px-6 lg:px-12 '>
                <div className="space-y-6 h-full md:mb-4 mb-2">    
                    {messages.map((msg) => (
                        <div
                        key={msg._id}
                        className={`${
                            msg.senderId === userDb?._id ? "items-end" : "items-start"
                        }`}
                        >
                        <MessageBox
                            message={msg}
                            user={info}
                            userDb={userDb}
                        />
                        </div>
                    ))}
                    <div ref={messageEndRef} />
                </div>
            </div>

            <div className='flex flex-col fixed w-full lg:w-5/6 -translate-x-1/2 bottom-0 left-[50%] px-4 lg:px-10 bg-white py-2 z-50'>
                <div className='flex justify-between gap-2 max-md:gap-x-[4px] rounded-xl bg-[#F6F6F6] px-1 py-1.5'>
                    <input 
                        type='text'
                        onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                        required
                        value={formData.message}
                        placeholder='Enter your message here...'
                        className='bg-transparent outline-none w-full text-gray-600 text-[14px] max-md:hidden px-4 placeholder:font-normal placeholder:text-zinc-500'
                    />

                    <input 
                        type='text'
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        value={formData.message}
                        placeholder='Type a message...'
                        className='bg-transparent outline-none w-full text-gray-600 text-[14px] md:hidden px-4 placeholder:font-normal placeholder:text-zinc-500'
                    />

                    <button onClick={() => handleClick()} className='p-2 bg-white text-gray-800 text-[16px] font-bold rounded-full'>
                        <FaArrowUp size={14} />
                    </button>
                </div>

                <p className='text-[11px] max-md:text-[9px] font-light mt-1 text-gray-500 no-wrap mx-auto'>Experience true anonymity with every chat. Keep the chatroom safe</p>
            </div>   
        </div>
        
        {showModal && (
            <div className='flex justify-center items-center fixed z-50 top-0 w-screen h-full overflow-scroll left-0 bg-black bg-opacity-50'>
                <div className='w-1/2 max-md:w-4/5 bg-white rounded-lg py-2'>
                    <div className='flex items-center justify-between px-6'>
                        <h1 className='text-[16px] font-medium text-gray-900 '>Share public link to chat</h1>
                        <button onClick={() => {setShowModal(false)}} className='py-6 relative'>
                            <RxCross2 className='absolute top-3 -left-6 max-md:-left-4 text-gray-700' size={24}/>
                        </button>
                    </div>
                
                    <hr className='w-full text-gray-600 opacity-70 h-px'/>

                    <div className='md:mx-12 md:my-8 m-4 md:space-y-6 space-y-2'>
                        <p className='text-[16px] font-normal max-md:text-[14px] '>Your name, custom instructions, and any messages you add after sharing stay private.</p>
                    </div>

                    <div className='xl:mx-20 border rounded-[32px] border-gray-400 max-md:pl-3 pr-1 pl-6 py-1 flex items-center justify-between mx-6 mb-4 max-md:mx-5 max-md:py-1'>
                        <p className='text-[16px] text-gray-400 font-medium max-md:text-sm max-lg:hidden'>{shareLink}...</p>
                        <p className='text-[16px] text-gray-400 font-medium max-md:text-sm lg:hidden'>{mobileShareLink}...</p>
                        <button onClick={() => setShowSocials(true)} className='rounded-3xl bg-gray-600 hover:bg-gray-800 gap-1 py-3 px-5 max-md:px-2.5 max-md:py-2 flex items-center'> 
                            <PiLinkSimpleLight color='white' size={14} /> 
                            <p className='text-[14px] max-md:text-[12px] text-white text-nowrap'>Share link</p>
                        </button>
                    </div>

                    {showSocials && (
                        <div className='pb-4 pt-2 flex justify-self-center items-center justify-around space-x-6'>
                            <button onClick={() => window.open(whatsappLink, '_blank')} className='rounded-full bg-gray-500 p-2.5'><FaWhatsapp color='white' size={18} /></button>
                            <button onClick={() => onClipboardClick()} className='rounded-full bg-gray-500 p-2.5'><FaRegClipboard color='white' size={18} /></button>
                            <button onClick={() => window.open(twitterLink, '_blank')} className='rounded-full bg-gray-500 p-2.5'><FaXTwitter color='white' size={18} /></button>
                            <button onClick={() => window.open(facebookLink, '_blank')} className='rounded-full bg-gray-500 p-2.5'><FaFacebookF color='white' size={18} /></button>
                        </div>
                    )}

                </div>
            </div>
        )}

    </div>
  )
}

export default Conversation
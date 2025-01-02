"use client";

import { useEffect, useState } from "react";
import { IMessage } from "@/model/messages";
import { avatars, Avatar } from "@/constants";
import React from "react";
import getSingleUser from '@/libs/getSingleUser';
import { IUser } from '@/model/user'


interface Profile {
  username: string;
  avatar: number;
}

interface MessageBoxProps {
  message: IMessage;
  user: Profile;
  userDb: IUser | null;
}

const MessageBox: React.FC<MessageBoxProps> = ({ message, user, userDb }) => {

  const userAvatar = avatars.find((avatar) => avatar.id === user.avatar);
  

  return (
    // <div className="flex gap-2 justify-start items-start">
    //   <span className="rounded-full shadow bg-[#cecece] p-2 flex items-start pt-6">
    //     {userAvatar && <userAvatar.image size={18} />}
    //   </span>
    //   <div className="flex flex-col space-y-1 items-start justify-start">
    //     <div className="flex space-x-2 items-center justify-start">
    //       <h1 className="text-[14px] text-[#7A7A7A] capitalize font-medium">
    //         {user.username}
    //       </h1>  
    //     </div>
    //     <div className="min-h-10 px-4 py-3 bg-[#F6F6F6] rounded-lg">
    //       <p className="text-[16px] max-md:text-[12px] text-black font-medium leading-6">
    //         {message.message}
    //       </p>
    //     </div>
    //   </div>
    // </div>

    <div>
      <div className={`flex flex-col space-y-1 ${message.senderId === userDb?._id && "items-end flex-wrap"}`}>
        <h1 className={`text-[14px] text-[#7A7A7A] capitalize font-medium ml-11 ${message.senderId === userDb?._id && "flex items-end mr-11"}`}>
          {user.username}
        </h1> 
        <div className={`flex gap-x-2 justify-start items-start ${message.senderId === userDb?._id && "flex-row-reverse justify-end"}`}>
          <span className="rounded-full shadow bg-[#cecece] p-2">
            {userAvatar && <userAvatar.image size={16} />}
          </span>
          
          <div className={`px-5 py-2.5 bg-[#F6F6F6] rounded-3xl ${message.senderId === userDb?._id && "bg-blue-600"}`}>
            <p className={`text-[14px] max-md:text-[14px] text-[#565558] font-medium leading-6 ${message.senderId === userDb?._id && "text-white "}`}>
              {message.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;

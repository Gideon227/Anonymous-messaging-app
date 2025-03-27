"use client";

import { useEffect, useState } from "react";
import { IMessage } from "@/model/messages";
import { avatars, Avatar } from "@/constants";
import React from "react";
import getSingleUser from '@/libs/getSingleUser';
import { IUser } from '@/model/user'
import getUserById from "@/libs/getUserById";
import { Types } from "mongoose";



interface Profile {
  username: string;
  avatar: number;
}

interface MessageBoxProps {
  message: IMessage;
  user: Profile;
  userDb: IUser | null;
  showName: boolean;
}


const MessageBox: React.FC<MessageBoxProps> = ({ message, user, userDb, showName }) => {
  const senderId = message.senderId as IUser;

  const userAvatar = avatars.find((avatar) => avatar.id === senderId.avatar);

  return (
    <div className={`${!showName && '-mt-1'}`}>
      <div className={`flex flex-col space-y-1 ${senderId?._id === userDb?._id && "items-end flex-wrap"}`}>
        {showName && (
          <h1 className={`text-[13px] text-[#7A7A7A] capitalize font-medium ml-11 items-center ${senderId?._id === userDb?._id ? "flex items-end mr-11" : ""}`}>
            {senderId.username}
          </h1>
        )}
        <div className={`flex gap-x-2 justify-start items-start ${senderId?._id === userDb?._id && "flex-row-reverse justify-end"}`}>
          <span className={`rounded-full shadow bg-[#cecece] p-2 ${!showName && 'mx-[7px] invisible'}`}>
            { userAvatar && showName && <userAvatar.image size={16} />}
          </span>
          <div className={`px-3.5 pt-2 bg-[#F6F6F6] rounded-2xl items-center ${senderId?._id === userDb?._id && "bg-blue-600"}`}>
            <p className={`text-[14px] max-md:text-[13px] max-md:leading-5 text-[#565558] font-medium leading-6 ${senderId?._id === userDb?._id && "text-gray-200"}`}>
              {message.message}
              <span className={`flex items-end justify-end text-[8px] px-1 font-normal pt-1 ${senderId?._id === userDb?._id && "!justify-start"}`}>{new Date(message.createdAt).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;

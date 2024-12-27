"use client";

import { useEffect, useState } from "react";
import { IMessage } from "@/model/messages";
import { avatars, Avatar } from "@/constants";
import React from "react";

interface Profile {
  username: string;
  avatar: number;
}

interface MessageBoxProps {
  message: IMessage;
  user: Profile;
}

const MessageBox: React.FC<MessageBoxProps> = ({ message, user }) => {

  const userAvatar = avatars.find((avatar) => avatar.id === user.avatar);

  return (
    <div className="border rounded-lg shadow flex gap-2 px-4 py-3 justify-start items-start bg-white w- min-h-20">
      <span className="rounded-lg shadow">
        {userAvatar && <userAvatar.image size={21} />}
      </span>
      <div className="flex flex-col space-y-2 items-start justify-start">
        <div className="flex space-x-2 items-center">
          <h1 className="text-[13px] text-gray-900 capitalize font-medium">
            {user.username}
          </h1>
          <span className="w-1 h-1 rounded-full bg-gray-900 shadow"></span>
          <p className="text-[12px] text-gray-500 font-medium">
            {new Date(message.createdAt).toLocaleTimeString()}
          </p>
        </div>
        <div>
          <p className="text-[13px] max-md:text-[12px] text-gray-700 font-medium leading-6">
            {message.message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;

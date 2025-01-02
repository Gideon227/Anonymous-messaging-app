"use client";

import Setup from "@/components/Setup";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import createUniqueLinkId from "@/libs/createlink";
import createNewLink from "@/libs/createNewLink";
import getSingleUser from "@/libs/getSingleUser";

const Page = () => {
  const router = useRouter();

  interface Profile {
    username: string;
    avatar: number;
  }

  useEffect(() => {
    const profileFromLocalStorage = localStorage.getItem("profile");
    const profile: Profile | null = profileFromLocalStorage
      ? (JSON.parse(profileFromLocalStorage) as Profile)
      : null;

    const redirectOrSetup = async () => {
      if (profile) {
        try {
          const chatRoomLink = await createUniqueLinkId();
          const userId = await getSingleUser(profile?.username)
          await createNewLink(chatRoomLink, userId._id )
          router.push(`/chatroom/${chatRoomLink}`);
        } catch (error) {
          console.error("Failed to create chat room link", error);
        }
      }
    };

    redirectOrSetup();
  }, []);


  return (
    <div className="lg:mt-32 mt-8">
      <Setup />
    </div>
  );
};

export default Page;

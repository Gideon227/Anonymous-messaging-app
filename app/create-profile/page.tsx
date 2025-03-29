"use client";
import Loading from "../loading";
import Setup from "@/components/Setup";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState, Suspense } from "react";
import createUniqueLinkId from "@/libs/createlink";
import createNewLink from "@/libs/createNewLink";
import getSingleUser from "@/libs/getSingleUser";

interface Profile {
  username: string;
  avatar: number;
}

const CreateProfilePage = () => {
  const router = useRouter();
  const [shouldRender, setShouldRender] = useState(false);

  useLayoutEffect(() => {
    const profileFromLocalStorage = localStorage.getItem("profile");
    const profile: Profile | null = profileFromLocalStorage
      ? JSON.parse(profileFromLocalStorage)
      : null;

    if (profile) {
      // If a profile exists, redirect immediately
      (async () => {
        try {
          const chatRoomLink = await createUniqueLinkId();
          const userId = await getSingleUser(profile.username);
          await createNewLink(chatRoomLink, userId._id);
          router.push(`/chatroom/${chatRoomLink}`);
        } catch (error) {
          console.error("Failed to create chat room link", error);
          setShouldRender(true);
        }
      })();
    } else {
      setShouldRender(true);
    }
  }, [router]);

  if (!shouldRender) return null;

  return (
    <Suspense fallback={<Loading />}>
      <div className="lg:mt-32 mt-8">
        <Setup />
      </div>
    </Suspense>
  );
};

export default CreateProfilePage;

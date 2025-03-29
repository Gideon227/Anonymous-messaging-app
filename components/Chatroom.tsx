"use client";
import React, { useLayoutEffect, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Conversation from "@/components/Conversation";
import Loading from "@/app/loading";

interface Profile {
  userName: string;
  avatar: number;
}

const Chatroom = ({ slug }: { slug: string }) => {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    try {
      const profileFromLocalStorage = localStorage.getItem("profile");
      const parsedProfile: Profile | null = profileFromLocalStorage
        ? JSON.parse(profileFromLocalStorage)
        : null;
      if (parsedProfile) {
        setProfile(parsedProfile);
      } else {
        router.push(`/create-profile?redirect=/chatroom/${slug}`);
      }
    } catch (error) {
      console.error("Error parsing profile:", error);
      router.push("/create-profile");
    }
    setLoading(false);
  }, []);
  

  if (loading) {
    return <Loading />;
  }

  return profile ? (
    <div>
      <Conversation slug={slug} />
    </div>
  ) : null; // Return null if the user is redirected
};

export default Chatroom;

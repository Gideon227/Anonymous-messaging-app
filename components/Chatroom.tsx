"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Conversation from "@/components/Conversation";

interface Profile {
  userName: string;
  avatar: number;
}

const Chatroom = ({ slug }: { slug: string }) => {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const profileFromLocalStorage = localStorage.getItem("profile");
      const parsedProfile: Profile | null = profileFromLocalStorage
        ? JSON.parse(profileFromLocalStorage)
        : null;
      if (parsedProfile) {
        setProfile(parsedProfile);
      } else {
        router.push("/create-profile");
      }
    } catch (error) {
      console.error("Error parsing profile:", error);
      router.push("/create-profile");
    }
    setLoading(false);
  }, [router]);
  

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator
  }

  return profile ? (
    <div>
      <Conversation slug={slug} />
    </div>
  ) : null; // Return null if the user is redirected
};

export default Chatroom;

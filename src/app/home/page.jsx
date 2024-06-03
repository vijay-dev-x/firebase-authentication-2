"use client";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/setup";
import { signOut, onAuthStateChanged } from "firebase/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [userData, setUserData] = useState("");
  const jwt = sessionStorage.getItem("jwt");
  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logout successfuly");
      console.log("User signed out successfully");
      router.push("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  useEffect(() => {
    if (jwt) {
      onAuthStateChanged(auth, (user) => {
        setUserData(user);
      });
    } else {
      router.push("/");
    }
  }, [router]);
  // console.log("userdata", userData);
  return (
    <div className="  flex-col  gap-5 bg-black text-white h-[100vh] w-full flex justify-center items-center">
      <h1 className=" text-2xl font-semibold ">
        Welcome {userData?.displayName}
      </h1>
      <button
        onClick={logout}
        className=" px-4 py-2 rounded-md  bg-red-600/90 border-none outline-none font-semibold text-lg"
      >
        Logout
      </button>
    </div>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import Carousel from "@/components/auth/Carousel";
import SignInForm from "@/components/auth/SignInForm";

const SignInScreen = () => {
  const router = useRouter();

  const handleLoginGoogle = async () => {
    router.push("http://localhost:4001/api/auth/google");
  };

  const handleLoginGithub = async () => {
    router.push("http://localhost:4001/api/auth/github");
  };
  return (
    <div className="flex w-screen h-screen">
      <div className="xl:w-[55%] w-full flex items-center justify-center flex-col gap-4">
        <div className="flex w-[400px]  justify-center gap-2 flex-col">
          <div className="flex  items-center gap-2">
            <Image src="/logo2.png" alt="" width={50} height={50} />
            <h2 className="text-[22px] font-semibold">Taskaroo</h2>
          </div>
          <h3 className="text-xl font-semibold">Sign In</h3>
          <p className="text-gray10 text-[14px]">Welcome back !</p>
          <div className="flex items-center gap-4">
            <button
              onClick={handleLoginGoogle}
              className="flex items-center justify-center w-[200px] bg-gray12 rounded-md text-gray2 h-[40px] gap-3 mt-2"
            >
              <FcGoogle size={24} />
              <span className="font-[500] text-[13px] ">
                Sign In with Google
              </span>
            </button>

            <button
              onClick={handleLoginGithub}
              className="flex items-center justify-center w-[200px] bg-gray12 rounded-md text-gray2 h-[40px] gap-3 mt-2"
            >
              <FaGithub size={24} />
              <span className="font-[500] text-[13px]">
                Sign In with Github
              </span>
            </button>
          </div>
          <div className="flex items-center gap-4 justify-center mt-5">
            <div className="w-[200px] h-[2px] bg-gradient-to-r to-bg-gray11 from-gray12"></div>
            <span className="font-[400]">OR</span>
            <div className="w-[200px] h-[2px] bg-gradient-to-r to-bg-gray11 from-gray12"></div>
          </div>
          <SignInForm />
        </div>
      </div>

      <div className="w-[45%] xl:block hidden ">
        <div className="bg-auth">
          <div className="bg-black/50 w-[70%] h-[600px] mx-auto rounded-lg backdrop-blur-2xl">
            <Carousel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInScreen;

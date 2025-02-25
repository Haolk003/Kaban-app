import React from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import Carousel from "@/components/auth/Carousel";
import SignInForm from "@/components/auth/SignInForm";

const SignInScreen = () => {
  return (
    <div className="flex w-screen h-screen">
      <div className="w-[55%] flex items-center justify-center flex-col gap-4">
        <div className="flex w-[400px]  justify-center gap-2 flex-col">
          <div className="flex  items-center gap-2">
            <Image src="/logo2.png" alt="" width={50} height={50} />
            <h2 className="text-2xl font-bold">Taskaroo</h2>
          </div>
          <h3 className="text-2xl font-semibold">Sign Up</h3>
          <p className="text-gray10 text-[15px]">Welcome back !</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-[200px] bg-gray12 rounded-md text-gray2 h-[40px] gap-3 mt-2">
              <FcGoogle size={24} />
              <span className="font-semibold">Sign In with Google</span>
            </div>
            <div className="flex items-center justify-center w-[200px] bg-gray12 rounded-md text-gray2 h-[40px] gap-3 mt-2">
              <FaGithub size={24} />
              <span className="font-semibold">Sign In with Github</span>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center mt-5">
            <div className="w-[200px] h-[2px] bg-gradient-to-r to-bg-gray11 from-gray12"></div>
            <span className="font-[400]">OR</span>
            <div className="w-[200px] h-[2px] bg-gradient-to-r to-bg-gray11 from-gray12"></div>
          </div>
          <SignInForm />
        </div>
      </div>

      <div className="w-[45%]">
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

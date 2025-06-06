"use client";

import React from "react";
import Image from "next/image";
import Carousel from "@/components/auth/Carousel";
import VerificationForm from "@/components/auth/VerificationForm";

const VerificationScreen = () => {
  return (
    <div className="flex w-screen h-screen">
      <div className="xl:w-[55%] w-full flex items-center justify-center flex-col gap-4">
        <div className="flex w-[400px]  justify-center gap-2 flex-col">
          <div className="flex  items-center gap-2">
            <Image src="/logo2.png" alt="" width={50} height={50} />
            <h2 className="text-2xl font-bold">Taskaroo</h2>
          </div>
          <h3 className="text-2xl font-semibold">Verifiy Your Account</h3>
          <p className="text-gray10 text-[15px]">
            Enter the 4 digit code sent to the registered email id
          </p>
          <VerificationForm />
        </div>
      </div>

      <div className="w-[45%] xl:block hidden">
        <div className="bg-auth">
          <div className="bg-black/50 w-[70%] h-[600px] mx-auto rounded-lg backdrop-blur-2xl">
            <Carousel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationScreen;

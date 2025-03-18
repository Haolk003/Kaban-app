"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { CiDark } from "react-icons/ci";
import { IoNotificationsOutline } from "react-icons/io5";
import ProfilePopover from "./ProfilePopover";

import { useMutation } from "@apollo/client";
import { LOGOUT_USER } from "@/lib/graphql/actions/logout.action";

import { useRouter } from "next/navigation";
import LoadingUI from "../ui/LoadingUI";

const BoardHeader = () => {
  const router = useRouter();
  const [logoutUser, { loading, data }] = useMutation(LOGOUT_USER);

  useEffect(() => {
    if (data) {
      router.push("/auth/sign-in");
    }
  }, [data, router]);

  return (
    <div className="w-full h-[70px] shadow-md shadow-gray11 bg-white  flex items-center justify-between px-5 ">
      <div>
        <AiOutlineMenuUnfold size={20} />
      </div>

      <div className="flex items-center gap-5">
        <button>
          <CiDark size={20} />
        </button>

        <button className="relative">
          <span className="absolute -top-2 -right-2 bg-cyan10 text-[12px] font-[500] text-white w-4 h-4 rounded-full flex justify-center items-center">
            4
          </span>
          <IoNotificationsOutline size={20} />
        </button>
        <div className="flex items-center gap-2">
          <ProfilePopover
            user={{
              name: "Hao Nguyen",
              email: "nguyenquochaolop91@gmail.com",
              id: "1234",
            }}
            logoutHander={logoutUser}
          />
          <div>
            <p className="text-[13px] font-[500]">Hao Nguyen</p>
            <p className="text-[12px] text-gray10">Web dev</p>
          </div>
        </div>
      </div>
      {loading && <LoadingUI />}
    </div>
  );
};

export default BoardHeader;

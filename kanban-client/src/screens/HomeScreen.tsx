"use client";

import React, { useEffect } from "react";

import { FiSearch } from "react-icons/fi";
import BoardHeader from "@/components/board/BoardHeader";
import { useAuthStore } from "@/store/userStore";
const HomeScreen = () => {
  const { user } = useAuthStore();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div>
      <BoardHeader />
    </div>
    // <div className="flex items-center p-4 bg-white">
    //   <button className="bg-purple-7 text-gray-12 px-4 py-2 rounded shadow-md">
    //     + New Board
    //   </button>
    //   <Select>
    //     <SelectTrigger className="bg-gray-3 text-gray-12 border border-gray-6 rounded px-2 py-1">
    //       <SelectValue placeholder="Sort By" />
    //     </SelectTrigger>
    //     <SelectContent>
    //       <SelectItem value="option1">Option 1</SelectItem>
    //       <SelectItem value="option2">Option 2</SelectItem>
    //     </SelectContent>
    //   </Select>
    //   <div className="flex items-center mx-4">
    //     <img
    //       src="https://via.placeholder.com/32"
    //       alt="Avatar 1"
    //       className="w-8 h-8 rounded-full mr-2"
    //     />
    //     <img
    //       src="https://via.placeholder.com/32"
    //       alt="Avatar 2"
    //       className="w-8 h-8 rounded-full mr-2"
    //     />
    //     <img
    //       src="https://via.placeholder.com/32"
    //       alt="Avatar 3"
    //       className="w-8 h-8 rounded-full mr-2"
    //     />
    //     <img
    //       src="https://via.placeholder.com/32"
    //       alt="Avatar 4"
    //       className="w-8 h-8 rounded-full mr-2"
    //     />
    //     <img
    //       src="https://via.placeholder.com/32"
    //       alt="Avatar 5"
    //       className="w-8 h-8 rounded-full mr-2"
    //     />
    //     <img
    //       src="https://via.placeholder.com/32"
    //       alt="Avatar 6"
    //       className="w-8 h-8 rounded-full mr-2"
    //     />
    //     <div className="w-8 h-8 bg-purple-7 text-gray-12 rounded-full flex items-center justify-center">
    //       +8
    //     </div>
    //   </div>
    //   <div className="flex items-center ml-auto">
    //     <input
    //       type="text"
    //       placeholder="Search"
    //       className="bg-gray-3 text-gray-12 border border-gray-6 rounded px-2 py-1 mr-2"
    //     />
    //     <button className="bg-gray-3 border border-purple-7 text-gray-12 rounded-full p-2">
    //       <FiSearch size={20} />
    //     </button>
    //   </div>
    // </div>
  );
};

export default HomeScreen;

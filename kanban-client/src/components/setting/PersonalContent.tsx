import React from "react";
import { Avatar } from "radix-ui";
import { IoCameraOutline } from "react-icons/io5";

const PersonalContent = () => {
  return (
    <div>
      <div className="py-5 border border-gray12 m-5 rounded-md px-4">
        <div className="flex flex-col">
          <h2 className="text-[15px] font-semibold">Photo:</h2>
          <div className="flex items-center gap-10 mt-5">
            <div className="relative">
              <Avatar.Root className="inline-flex size-[80px] select-none items-center justify-center overflow-hidden rounded-full bg-blackA1 align-middle">
                <Avatar.Image
                  className="size-full rounded-[inherit] object-cover"
                  src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
                  alt="Colm Tuite"
                />
                <Avatar.Fallback
                  className="leading-1 flex size-full items-center justify-center bg-white text-[15px] font-medium text-violet11"
                  delayMs={600}
                >
                  CT
                </Avatar.Fallback>
              </Avatar.Root>
              <button className="absolute -top-[2px] right-1 flex items-center justify-center text-white rounded-full bg-violet11 size-[22px] text-[14px] border-[2px] border-white">
                <IoCameraOutline />
              </button>
            </div>
            <div className="flex items-center">
              <button className="w-[100px] h-[40px] text-center text-[13px] bg-violet10 text-white rounded-s-md font-[500]">
                Change
              </button>
              <button className="w-[100px] h-[40px] text-center text-[13px] bg-gray12  rounded-e-md font-[500]">
                Remove
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-[15px] font-semibold mt-7 mb-4">Profile:</h2>
          <div className="">
            <p className="font-[500] text-[15px]">Name:</p>
            <input
              placeholder="Your name..."
              type="text"
              className="w-full h-[40px]  drop-shadow-sm border border-gray12 shadow-gray11 rounded-md mt-2 px-4 "
            />
          </div>
        </div>

        <div>
          <h2 className="text-[15px] font-semibold mt-7 mb-4">
            Personal information:
          </h2>
          <div className="flex items-center justify-between">
            <div className="w-[45%]">
              <p className="font-[500] text-[15px]">Job title</p>
              <input
                type="text"
                placeholder="Your job"
                className="w-full h-[40px]  drop-shadow-sm border border-gray12 shadow-gray11 rounded-md mt-2 px-4 "
              />
            </div>
            <div className="w-[45%]">
              <p className="font-[500] text-[15px]">Location</p>
              <input
                placeholder="Your location"
                type="text"
                className="w-full h-[40px]  drop-shadow-sm border border-gray12 shadow-gray11 rounded-md mt-2 px-4 "
              />
            </div>
          </div>
          <div>
            <p className="font-[500] text-[15px] mt-4">Bio:</p>
            <textarea
              placeholder="Lorem ipsum doror..."
              className="w-full min-h-[150px] py-4  drop-shadow-sm border border-gray12 shadow-gray11 rounded-md mt-2 px-4"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end w-full px-5">
        <div className="flex items-center gap-5">
          <button className="text-[14px] font-[500] bg-slate3 px-5 h-[40px] rounded-md">
            Restore Defaults
          </button>
          <button className="text-[14px] font-[500] bg-iris10 text-white px-5 h-[40px] rounded-md">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalContent;

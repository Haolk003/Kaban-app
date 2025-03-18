"use client";

import React from "react";
import { Tabs, Avatar } from "radix-ui";
import PersonalContent from "./PersonalContent";

const SettingTabs = () => {
  return (
    <Tabs.Root
      className="w-full bg-white rounded-md pb-5"
      defaultValue="personal"
    >
      <Tabs.List className="space-x-4 border-b gap-4 border-gray12 w-full py-4 px-4">
        <div className="inline-flex gap-2">
          <Tabs.Trigger
            value="personal"
            className="px-5 h-[35px]   cursor-default select-none items-center justify-center bg-white  text-[13px] leading-none text-gray4 outline-none rounded-md data-[state=active]:text-violet9 data-[state=active]:bg-violet3 font-[500]"
          >
            Personal Information
          </Tabs.Trigger>
          <Tabs.Trigger
            value="account"
            className="px-5 h-[35px]   cursor-default select-none items-center justify-center bg-white  text-[13px] leading-none text-gray4 outline-none rounded-md data-[state=active]:text-violet9 data-[state=active]:bg-violet3 font-[500]"
          >
            Account Setting
          </Tabs.Trigger>
        </div>
      </Tabs.List>
      <Tabs.Content value="personal">
        <PersonalContent />
      </Tabs.Content>
      <Tabs.Content value="account">Hello</Tabs.Content>
    </Tabs.Root>
  );
};

export default SettingTabs;

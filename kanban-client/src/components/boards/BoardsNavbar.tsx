import React, { useEffect } from "react";

import {
    FiBell,
    FiMenu,
    FiSearch,
    FiSettings,
} from "react-icons/fi";


import { useAuthStore } from "@/store/userStore";
import { useRouter } from "next/navigation"
import { Button } from "../ui/button";

import ProfilePopover from "@/components/board/ProfilePopover";
import {LOGOUT_USER} from "@/lib/graphql/actions/auth/logout.action";
import {useMutation} from "@apollo/client";


const BoardNavbar = () => {
    const [logoutUser,{data:logoutData,error:logoutError}] = useMutation(LOGOUT_USER);
    const router = useRouter();
    const { user,clearUser } = useAuthStore();


    const handleLogout = async () => {
        await logoutUser();

    }

    useEffect(() => {
        if(logoutData && logoutData.logoutUser && !logoutData.logoutUser.error){
            console.log("Logout Success");
            clearUser();
            router.push("/auth/sign-in");
        }
        if(logoutData && logoutData.logoutUser && logoutData.logoutUser.error){
            console.log("Logout Error");
        }
        console.log(
            logoutData && logoutData.logoutUser && logoutData.logoutUser.error
        )
    }, [clearUser, logoutData, router]);



    return (
        <header className="border-b">
            <div className="flex items-center justify-between h-16 px-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon">
                        <FiMenu className="h-5 w-5" />
                    </Button>
                </div>

                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon">
                        <FiSearch className="h-5 w-5" />
                    </Button>

                    {/*<Button variant="ghost" size="icon">*/}
                    {/*  <FiMoon className="h-5 w-5" />*/}
                    {/*</Button>*/}

                    <div className="relative">
                        <Button variant="ghost" size="icon">
                            <FiBell className="h-5 w-5" />
                        </Button>
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-medium text-white">
              8
            </span>
                    </div>
                    <ProfilePopover user={user} logoutHander={handleLogout}/>
                    <Button variant="ghost" size="icon">
                        <FiSettings className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default BoardNavbar;

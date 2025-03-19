/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { Avatar, Form } from "radix-ui";
import { useForm } from "react-hook-form";
import { IoCameraOutline } from "react-icons/io5";
import { useAuthStore } from "@/store/userStore";
import LoadingUI from "../ui/LoadingUI";

import { uploadUserAvatar } from "@/services/upload.service";

import { LuLoader } from "react-icons/lu";
import {
  UpdateProfileFormValue,
  updateProfileSchema,
} from "@/validations/updateProfileValidation";
import { yupResolver } from "@hookform/resolvers/yup";

import { useMutation } from "@apollo/client";
import { UPDATE_PROFILE } from "@/lib/graphql/actions/updateProfile.action";

const PersonalContent = () => {
  const [updateProfile, { loading: loading2, data, error }] =
    useMutation(UPDATE_PROFILE);

  const { user, loading } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileFormValue>({
    resolver: yupResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name || "",
      jobName: user?.jobName || "",
      location: user?.location || "",
      bio: user?.bio || "",
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [avatarUrl, setAvatarUrl] = useState<{
    url: string;
    public_id?: string;
  }>({
    url: user && user.avatar ? user.avatar.url : "avatarr.jpg",
    public_id: user?.avatar?.public_id,
  });

  const [loadingAvatar, setLoadingAvatar] = useState(false);

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoadingAvatar(true);
      const res = await uploadUserAvatar(file);
      setAvatarUrl({ ...res });
      console.log("Upload thành công:", res);
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoadingAvatar(false);
    }
  };

  const onSubmit = async (data: UpdateProfileFormValue) => {
    await updateProfile({ variables: { ...data, avatar: { ...avatarUrl } } });
    console.log(data);
  };

  useEffect(() => {
    if (data && data.updateProfile && !data.updateProfile.error) {
      console.log("Update Profile Success");
    }
    if (error) {
      console.log(error);
    }
  }, [data, error]);
  return (
    <div>
      {user && (
        <div>
          <Form.Root onSubmit={handleSubmit(onSubmit)}>
            <div className="py-5 border border-gray12 m-5 rounded-md px-4">
              <div className="flex flex-col">
                <h2 className="text-[15px] font-semibold">Photo:</h2>
                <div className="flex items-center gap-10 mt-5">
                  <div className="relative">
                    <Avatar.Root className="relative inline-flex size-[80px] select-none items-center justify-center overflow-hidden rounded-full bg-blackA1 align-middle ">
                      {loadingAvatar && (
                        <div className="absolute z-50 top-0 left-0 bg-black/50 flex items-center justify-center w-full h-full text-white ">
                          <LuLoader
                            className="animate-spin text-white "
                            size={20}
                          />
                        </div>
                      )}
                      <Avatar.Image
                        className="size-full rounded-[inherit] object-cover"
                        src={avatarUrl.url}
                        alt="Colm Tuite"
                      />
                      <Avatar.Fallback
                        className="leading-1 flex size-full items-center justify-center bg-white text-[15px] font-medium text-violet11"
                        delayMs={600}
                      >
                        CT
                      </Avatar.Fallback>
                    </Avatar.Root>
                    <button
                      className="absolute -top-[2px] right-1 flex items-center justify-center text-white rounded-full bg-violet11 size-[22px] text-[14px] border-[2px] border-white"
                      onClick={handleClickUpload}
                    >
                      <IoCameraOutline />
                    </button>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="w-[100px] h-[40px] text-center text-[13px] bg-violet10 text-white rounded-s-md font-[500]"
                      onClick={handleClickUpload}
                    >
                      Change
                    </button>
                    <button className="w-[100px] h-[40px] text-center text-[13px] bg-gray12  rounded-e-md font-[500]">
                      Remove
                    </button>
                  </div>
                  <input
                    type="file"
                    onChange={handleUpload}
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                  />
                </div>
              </div>
              <Form.Field name="name">
                <div>
                  <h2 className="text-[15px] font-semibold mt-7 mb-4">
                    Profile:
                  </h2>
                  <div className="">
                    <p className="font-[500] text-[15px]">Name:</p>
                    <input
                      {...register("name")}
                      placeholder="Your name..."
                      type="text"
                      className={`w-full h-[40px]  drop-shadow-sm border border-gray12 shadow-gray11 rounded-md mt-2 px-4 ${
                        errors.name && "border-red8"
                      } `}
                    />
                    {errors.name && (
                      <p className="text-red8 text-[13px]">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                </div>
              </Form.Field>{" "}
              <div>
                <h2 className="text-[15px] font-semibold mt-7 mb-4">
                  Personal information:
                </h2>
                <div className="flex items-center justify-between">
                  <div className="w-[45%]">
                    <p className="font-[500] text-[15px]">Job title</p>
                    <input
                      {...register("jobName")}
                      type="text"
                      placeholder="Your job"
                      className="w-full h-[40px]  drop-shadow-sm border border-gray12 shadow-gray11 rounded-md mt-2 px-4 "
                    />
                  </div>
                  <div className="w-[45%]">
                    <p className="font-[500] text-[15px]">Location</p>
                    <input
                      {...register("location")}
                      placeholder="Your location"
                      type="text"
                      className="w-full h-[40px]  drop-shadow-sm border border-gray12 shadow-gray11 rounded-md mt-2 px-4 "
                    />
                  </div>
                </div>
                <div>
                  <p className="font-[500] text-[15px] mt-4">Bio:</p>
                  <textarea
                    {...register("bio")}
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
                <button
                  className="text-[14px] font-[500] bg-iris10 text-white px-5 h-[40px] rounded-md"
                  type="submit"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </Form.Root>
        </div>
      )}
      {(loading || loading2) && <LoadingUI />}
    </div>
  );
};

export default PersonalContent;

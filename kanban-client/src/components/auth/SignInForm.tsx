"use client";

import React from "react";
import { Form } from "radix-ui";
import { yupResolver } from "@hookform/resolvers/yup";
import InputAuth from "../ui/InputAuth";
import { SubmitHandler, useForm } from "react-hook-form";

import ButtonAuth from "../ui/ButtonAuth";
import { SignInFormValue, signInSchema } from "@/validations/signInValidation";
import Link from "next/link";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValue>({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit: SubmitHandler<SignInFormValue> = (data) => {
    console.log("Form Data:", data);
  };
  return (
    <div>
      <Form.Root
        className="w-full flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputAuth
          label="Email"
          type="email"
          {...register("email")}
          errors={errors}
          className="mb-4"
        />
        <InputAuth
          label="Password"
          type="password"
          {...register("password")}
          errors={errors}
          className="mb-4"
        />
        <div className="flex justify-end items-center text-red10 font-semibold text-[14px]">
          <Link href="/forgot-password">Forgot password ?</Link>
        </div>

        <div className="mt-2">
          <ButtonAuth type="submit" title="Create account" />
        </div>
      </Form.Root>

      <p className="text-center mt-5 text-[13px]">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-iris8">
          Sign Up
        </Link>{" "}
      </p>
    </div>
  );
};

export default SignInForm;

"use client";

import React, { useEffect } from "react";
import { Form } from "radix-ui";
import { useRouter } from "next/navigation";

import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

import ButtonAuth from "../ui/ButtonAuth";
import InputAuth from "../ui/InputAuth";
import { SignInFormValue, signInSchema } from "@/validations/signInValidation";
import { useMutation } from "@apollo/client";
import { LOGIN } from "@/lib/graphql/actions/auth/login.action";
import Link from "next/link";
import LoadingUI from "../ui/LoadingUI";
import { showToast } from "../ui/Toast";

const SignInForm = () => {
  const router = useRouter();
  const [handleLogin, { data, loading, error }] = useMutation(LOGIN);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValue>({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit: SubmitHandler<SignInFormValue> = async (data) => {
    await handleLogin({
      variables: {
        email: data.email,
        password: data.password,
      },
    });
    console.log("Form Data:", data);
  };

  useEffect(() => {
    if (data && data.login && !data.login.error) {
      router.push("/");
      console.log("Login Success");
    }
    if (error) {
      showToast("error", error.message);
    }
  }, [error, data]);
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
        <div className="flex justify-end items-center text-red10 font-semibold text-[13px]">
          <Link href="/forgot-password">Forgot password ?</Link>
        </div>

        <div className="mt-2">
          <ButtonAuth type="submit" title="Sign In" />
        </div>
      </Form.Root>

      <p className="text-center mt-5 text-[13px]">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-iris8">
          Sign Up
        </Link>{" "}
      </p>
      {loading && <LoadingUI />}
    </div>
  );
};

export default SignInForm;

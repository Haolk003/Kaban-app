"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Form } from "radix-ui";
import { yupResolver } from "@hookform/resolvers/yup";
import InputAuth from "../ui/InputAuth";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  signUpSchema,
  SignUpFormValue,
} from "../../validations/signUpValidation";
import ButtonAuth from "../ui/ButtonAuth";
import Link from "next/link";

import { useMutation } from "@apollo/client";
import { REGISTER } from "@/lib/graphql/actions/auth/register.action";

import LoadingUI from "../ui/LoadingUI";

const SignUpForm = () => {
  const router = useRouter();
  const [handleRegister, { data, loading, error }] = useMutation(REGISTER);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValue>({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormValue> = async (data) => {
    console.log("Form Data:", data);
    await handleRegister({
      variables: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      },
    });
  };

  useEffect(() => {
    if (data && data.registerUser && !data.registerUser.error) {
      router.push(
        `/auth/two-step-verification?token=${data.registerUser.token}`
      );
    }
    if (error) {
      console.log(error);
    }
  }, [data, error]);
  return (
    <div>
      <Form.Root
        className="w-full flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputAuth
          label="First Name"
          type="text"
          {...register("firstName")}
          errors={errors}
          className="mb-4"
        />
        <InputAuth
          label="Last Name"
          type="text"
          {...register("lastName")}
          errors={errors}
          className="mb-4"
        />
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
        <InputAuth
          label="Confirm Password"
          type="password"
          {...register("confirmPassword")}
          errors={errors}
          className="mb-4"
        />

        <div className="mt-2">
          <ButtonAuth type="submit" title="Create account" />
        </div>
      </Form.Root>

      <p className="text-center mt-5 text-[13px]">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-iris8">
          Sign In
        </Link>
      </p>
      {loading && <LoadingUI />}
    </div>
  );
};

export default SignUpForm;

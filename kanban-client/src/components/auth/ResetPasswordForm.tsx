import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form } from "radix-ui";
import InputAuth from "@/components/ui/InputAuth";
import ButtonAuth from "@/components/ui/ButtonAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  resetPasswordSchema,
  ResetPasswordFormValue,
} from "@/validations/resetPasswordValidation";

import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@apollo/client";

import { RESET_PASSWORD } from "@/lib/graphql/actions/auth/resetPassword.action";
import { showToast } from "../ui/Toast";
import LoadingUI from "../ui/LoadingUI";

const ResetPasswordForm = () => {
  const [resetPassword, { data, loading, error }] = useMutation(RESET_PASSWORD);
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValue>({
    resolver: yupResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormValue) => {
    console.log("Form Data:", data);
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    await resetPassword({
      variables: {
        email: email,
        password: data.password,
        token: token,
      },
    });
  };

  useEffect(() => {
    if (data && data.resetPassword) {
      console.log(data);
      router.push("/auth/sign-in");
    }
    if (error) {
      showToast("error", error.message);
    }
  }, [data, error]);

  return (
    <Form.Root
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <InputAuth
        {...register("password")}
        label="Password"
        type="password"
        errors={errors}
        name="password"
      />
      <InputAuth
        {...register("confirmPassword")}
        label="Confirm Password"
        type="password"
        errors={errors}
        name="confirmPassword"
      />

      <div className="mt-4">
        <ButtonAuth title="Submit" type="submit" />
      </div>
      {loading && <LoadingUI />}
    </Form.Root>
  );
};

export default ResetPasswordForm;

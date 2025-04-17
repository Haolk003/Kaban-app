import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import {
  ForgotPasswordFormValue,
  forgotPasswordSchema,
} from "@/validations/forgotPasswordValidaton";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "radix-ui";
import InputAuth from "../ui/InputAuth";
import ButtonAuth from "../ui/ButtonAuth";

import { useMutation } from "@apollo/client";
import { FORGOT_PASSWORD } from "@/lib/graphql/actions/auth/forgotPassword.action";
import LoadingUI from "../ui/LoadingUI";

const ForgotPasswordForm = () => {
  const [forgotPassword, { data, loading, error }] =
    useMutation(FORGOT_PASSWORD);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValue>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordFormValue) => {
    forgotPassword({
      variables: {
        email: data.email,
      },
    });
  };

  useEffect(() => {
    if (data && data.forgotPassword && !data.forgotPassword.error) {
      console.log("Forgot Password Success");
    }
    if (error) {
      console.log(error);
    }
  }, [data, error]);

  return (
    <>
      <Form.Root onSubmit={handleSubmit(onSubmit)}>
        <InputAuth
          {...register("email")}
          label="Your Email"
          placeholder="example@gmail.com"
          errors={errors}
          name="email"
        />
        <p className="text-[13px] text-gray4 mb-5 mt-4">
          Did not receive a mail? <button className="text-iris8">Resend</button>
        </p>
        <div className="mt-5">
          <ButtonAuth title="Submit" type="submit" />
        </div>
      </Form.Root>
      {loading && <LoadingUI />}
    </>
  );
};

export default ForgotPasswordForm;

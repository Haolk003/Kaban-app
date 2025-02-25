import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "radix-ui";
import InputAuth from "@/components/ui/InputAuth";
import ButtonAuth from "@/components/ui/ButtonAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  resetPasswordSchema,
  ResetPasswordFormValue,
} from "@/validations/resetPasswordValidation";

const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValue>({
    resolver: yupResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordFormValue) => {
    console.log("Form Data:", data);
  };

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
    </Form.Root>
  );
};

export default ResetPasswordForm;

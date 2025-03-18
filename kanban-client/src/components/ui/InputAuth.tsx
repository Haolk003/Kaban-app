import React from "react";
import { Form } from "radix-ui";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  errors?: { [key: string]: { message?: string } };
}
const InputAuth = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, name, errors, ...props }, ref) => {
    return (
      <Form.Field name={name}>
        <div className="flex items-baseline justify-between">
          <Form.Label className="text-[13px] font-medium leading-[35px] text-gray10">
            {label}
          </Form.Label>
          {errors && errors[name] && (
            <Form.Message className="text-red10 font-[400] text-[12px]">
              {errors[name].message}
            </Form.Message>
          )}
        </div>
        <Form.Control asChild>
          <input
            {...props}
            ref={ref}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray5 focus:ring-2 focus:ring-gray8 transition-shadow shadow-sm hover:shadow-md text-[13px] focus:shadow-lg placeholder:text-[14px]"
            placeholder={label}
          />
        </Form.Control>
      </Form.Field>
    );
  }
);
InputAuth.displayName = "InputAuth";

export default InputAuth;

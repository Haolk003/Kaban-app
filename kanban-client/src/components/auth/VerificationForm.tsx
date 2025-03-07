import React, { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ButtonAuth from "../ui/ButtonAuth";
import { useMutation } from "@apollo/client";
import { VERIFY_USER } from "@/lib/graphql/actions/verifyUser.action";

import { isEmpty } from "lodash";
import { showToast } from "../ui/Toast";

import LoadingUI from "../ui/LoadingUI";

type VerifyNumber = {
  0: "";
  1: "";
  2: "";
  3: "";
};

const VerificationForm = () => {
  const [verifyUser, { data, loading, error }] = useMutation(VERIFY_USER);
  const searchParams = useSearchParams();
  const router = useRouter();
  const inputRef = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [isErrorVerifyNumber, setIsErrorVerifyNumber] = useState(false);

  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  const handleChangeInput = (value: string, index: number) => {
    setIsErrorVerifyNumber(false);

    setVerifyNumber({
      ...verifyNumber,
      [index]: value ? value.trim()[value.length - 1] : "",
    });
    if (value !== "" && index < 3) {
      inputRef[index + 1].current?.focus();
    }
  };

  const handleSubmit = async () => {
    setIsErrorVerifyNumber(false);
    const token = searchParams.get("token");

    if (!Object.values(verifyNumber).every((num) => !isEmpty(num))) {
      setIsErrorVerifyNumber(true);
      return;
    }

    const code = Object.values(verifyNumber).join("");

    try {
      await verifyUser({
        variables: {
          token,
          activationCode: code,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data && data.activateUser && !data.activateUser.error) {
      showToast("success", "Account activated successfully");
      router.push("/auth/sign-in");
    }
    if (error) {
      setIsErrorVerifyNumber(true);
      showToast("error", error.message);
    }
  }, [data, error]);

  return (
    <div className="mt-5">
      <div className="flex justify-between items-center mb-4">
        {Object.keys(verifyNumber).map((item, index) => (
          <input
            key={item}
            ref={inputRef[index]}
            value={verifyNumber[Number(item) as unknown as keyof VerifyNumber]}
            onChange={(e) => handleChangeInput(e.target.value, index)}
            className={`w-20 h-12 text-center border-[2px] bg-gray-100 rounded-lg focus:outline-none font-[500] text-xl focus:ring-1 focus:ring-gray10 ${
              isErrorVerifyNumber
                ? "border-red-500 text-red-300"
                : "border-gray-200 "
            }`}
            maxLength={1}
          />
        ))}
      </div>

      <p className="text-[13px] text-gray4 mb-4">
        Did not receive a code? <button className="text-iris8">Resend</button>
      </p>

      <ButtonAuth title="Verify" handle={handleSubmit} />
      {loading && <LoadingUI />}
    </div>
  );
};

export default VerificationForm;

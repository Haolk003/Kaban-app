import React, { useState, useRef } from "react";
// import { useRouter } from "next/navigation";
import ButtonAuth from "../ui/ButtonAuth";

type VerifyNumber = {
  0: "";
  1: "";
  2: "";
  3: "";
};

const VerificationForm = () => {
  //   const router = useRouter();
  const inputRef = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  const handleChangeInput = (value: string, index: number) => {
    setVerifyNumber({
      ...verifyNumber,
      [index]: value ? value.trim()[value.length - 1] : "",
    });
    if (value !== "" && index < 3) {
      inputRef[index + 1].current?.focus();
    }
  };

  return (
    <div className="mt-5">
      <div className="flex justify-between items-center mb-4">
        {Object.keys(verifyNumber).map((item, index) => (
          <input
            key={item}
            ref={inputRef[index]}
            value={verifyNumber[Number(item) as unknown as keyof VerifyNumber]}
            onChange={(e) => handleChangeInput(e.target.value, index)}
            className="w-20 h-12 text-center bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
            maxLength={1}
          />
        ))}
      </div>{" "}
      <p className="text-[13px] text-gray4 mb-4">
        Did not receive a code? <button className="text-iris8">Resend</button>
      </p>
      <ButtonAuth title="Verify" />
    </div>
  );
};

export default VerificationForm;

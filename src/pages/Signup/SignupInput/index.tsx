import React from 'react';

import { UseFormRegister } from 'react-hook-form';
import { SignupPerson } from '@/interfaces/interfaces';

interface SignupInputProps {
  header: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<SignupPerson>;
  name: keyof SignupPerson;
}

const SignupInput: React.FC<SignupInputProps> = ({ header, type, placeholder, register, name }) => {
  return (
    <div className="flex flex-col mt-[25px] first:mt-0">
      <span className="font-rubik font-normal text-black">{header}</span>
      <input
        type={type}
        className="focus:border-yellow border border-[2px] border-[#EFEFEF] bg-transparent outline-none rounded py-[7px] px-[14px] font-rubik font-normal mt-[10px]"
        placeholder={placeholder}
        {...register(name)}
      />
    </div>
  );
};

export default SignupInput;

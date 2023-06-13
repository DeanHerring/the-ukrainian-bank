import React from 'react';

import { UseFormRegister } from 'react-hook-form';

interface InputProps {
  header: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<any>;
  name: any;
}

const Input: React.FC<InputProps> = ({ header, type, placeholder, register, name }) => {
  return (
    <div className="flex flex-col mt-[25px] first:mt-0">
      <span className="title-sm text-black">{header}</span>
      <input
        type={type}
        className="title-sm focus:border-yellow border-[2px] border-white-3 bg-transparent outline-none rounded py-[7px] px-[14px] mt-[10px]"
        placeholder={placeholder}
        autoComplete="off"
        {...register(name)}
      />
    </div>
  );
};

export default Input;

import React from 'react';

import { UseFormRegister } from 'react-hook-form';
import { SignupPerson } from '@/interfaces/interfaces';

interface FormCheckboxProps {
  title: string;
  register: UseFormRegister<SignupPerson>;
  name: keyof SignupPerson;
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({ title, register, name }) => {
  return (
    <div className="centered mt-[10px]">
      <input type="checkbox" {...register(name)} />
      <a href="#" className="title-sm font-normal text-black ml-[10px] underline">
        {title}
      </a>
    </div>
  );
};

export default FormCheckbox;

import React from 'react';

import { UseFormRegister } from 'react-hook-form';
import { Person } from '@/interfaces/interfaces';

interface FormCheckboxProps {
  title: string;
  register: UseFormRegister<Person>;
  name: keyof Person;
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({ title, register, name }) => {
  return (
    <div className="flex items-center mt-[10px] justify-center">
      <input type="checkbox" {...register(name)} />
      <a href="#" className="font-rubik font-normal text-black ml-[10px] underline">
        {title}
      </a>
    </div>
  );
};

export default FormCheckbox;

import React from 'react';

interface FormHeaderProps {
  header: string;
  description: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({ header, description }) => {
  return (
    <div className="my-[50px]">
      <h1 className="title-xl font-bold text-black">{header}</h1>
      <h3 className="title-sm text-black/30">{description}</h3>
    </div>
  );
};

export default FormHeader;

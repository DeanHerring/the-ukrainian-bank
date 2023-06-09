import React, { ReactNode } from 'react';

interface ContainerProps {
  children?: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <section className="pb-[50px]">
      <div className="max-w-[90%] w-[1300px] mx-auto">
        <div className="my-[50px]">{children}</div>
      </div>
    </section>
  );
};

export default Container;

import React from 'react';

// Нихуя не понимаю блять, хули делать то?!

const Test = () => {
  return (
    <>
      <h1>Test</h1>

      <C name="Nikita" age={10} />
    </>
  );
};

interface CProps {
  name: string;
  age: number;
  job?: string;
}

const C: React.FC<CProps> = ({ name, age, job }) => {
  return (
    <>
      <h1>Name: {name}</h1>
      <h1>Age: {age}</h1>
      <h1>Job: {job}</h1>
    </>
  );
};

export default Test;

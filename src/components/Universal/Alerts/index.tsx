import React from 'react';

interface AlertsProps {
  text: string | undefined;
}

const Alerts: React.FC<AlertsProps> = ({ text }) => {
  return (
    <div className="w-full py-[5px] px-[15px] rounded-md border border-red bg-red/30 mb-[15px]">
      <p className="font-rubik font-normal text-black">{text}</p>
    </div>
  );
};

export default Alerts;

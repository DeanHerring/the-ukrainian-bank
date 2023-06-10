import classNames from 'classnames';
import React from 'react';

interface AlertsProps {
  text: string | undefined;
  type: string;
}

const Alerts: React.FC<AlertsProps> = ({ text, type }) => {
  return (
    <div
      className={classNames(
        type === 'error' ? 'bg-red/25 border-red' : 'border-[2px] bg-black/25 border-black',
        type === 'notif' ? 'bg-yellow/25 border-yellow' : 'border-[2px] bg-black/25 border-black',
        'my-[25px] p-[10px] rounded-[10px] centered-y',
      )}
    >
      <h3 className="font-rubik font-normal text-black text-[17px]">{text}</h3>
    </div>
  );
};

export default Alerts;

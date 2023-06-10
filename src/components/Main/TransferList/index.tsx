import React from 'react';
import Transfer from '@/components/Main/Transfer';

const TransactionList: React.FC = () => {
  return (
    <div className="p-[20px] rounded-[10px] bg-white-1 mt-[20px]">
      <header className="centered-x justify-between">
        <h1 className="title-md font-medium text-black">Lastest Transfers</h1>
        <a className="title-sm text-black/50 underline" href="#">
          See more
        </a>
      </header>
      <div className="mt-[50px]">
        <ul>
          <Transfer sender="3781" receiver="8883" transfer_type={true} date="21.02.2032" amount={1880} />
        </ul>
      </div>
    </div>
  );
};

export default TransactionList;

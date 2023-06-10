import React from 'react';
import Transaction from '@/components/Main/Transaction';

const TransactionList: React.FC = () => {
  return (
    <div className="p-[20px] rounded-[10px] bg-white-1 mt-[20px]">
      <header className="flex justify-between items-center">
        <h1 className="title-md font-medium text-black">Lastest Transactions</h1>
        <a className="title-sm text-black/50 underline" href="#">
          See more
        </a>
      </header>
      <div className="mt-[50px]">
        <ul>
          <Transaction
            transaction_type={true}
            transaction_type_title="Перевод с карты на карту"
            date="20.09.2023 16:32"
            amount={90000}
          />
        </ul>
      </div>
    </div>
  );
};

export default TransactionList;

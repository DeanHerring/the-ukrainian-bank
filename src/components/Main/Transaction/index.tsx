import React from 'react';
import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillTransfer, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

interface TransactionProps {
  transaction_type: boolean;
  transaction_type_title: string;
  date: string;
  amount: number;
}

const Transaction: React.FC<TransactionProps> = ({ transaction_type, transaction_type_title, date, amount }) => {
  return (
    <li className="mt-[15px] first:mt-0">
      <a href="#" className="sm:bg-white-2 sm:p-[10px] sm:flex-col sm:items-start centered-y justify-between">
        <div className="centered-y flex-1 overflow-hidden">
          <div className="sm:hidden min-w-[50px] h-[50px] rounded-full bg-white-2 centered">
            <FontAwesomeIcon icon={faMoneyBillTransfer} className="text-[20px] text-black" />
          </div>
          <h3 className="sm:ml-0 font-rubik font-normal text-black text-[17px] ml-[15px] whitespace-nowrap truncate">
            {transaction_type_title}
          </h3>
        </div>
        <div className="sm:ml-0 flex-1 mx-[25px]">
          <h3 className="font-rubik font-normal text-black/50 text-[17px]">{date}</h3>
        </div>
        <div className="centered-y flex-1 justify-end">
          <h3 className={classNames(transaction_type ? 'text-green' : 'text-red', 'title-sm font-medium')}>
            {transaction_type ? '+' : '-'}$
            {amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h3>
          <div className="sm:hidden w-[50px] h-[50px] rounded-full bg-white-2 centered ml-[15px] cursor-pointer">
            <FontAwesomeIcon icon={faEllipsisVertical} className="text-[20px] text-black" />
          </div>
        </div>
      </a>
    </li>
  );
};

export default Transaction;

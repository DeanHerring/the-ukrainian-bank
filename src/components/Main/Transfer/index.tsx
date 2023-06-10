import React from 'react';
import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillTransfer, faEllipsisVertical, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

interface TransferProps {
  sender: string;
  receiver: string;
  transfer_type: boolean;
  date: string;
  amount: number;
}

const Transfer: React.FC<TransferProps> = ({ sender, receiver, transfer_type, date, amount }) => {
  return (
    <li className="mt-[15px] first:mt-0">
      <a href="#" className="sm:bg-white-2 sm:p-[10px] sm:flex-col sm:items-start centered-y justify-between">
        <div className="centered-y flex-1 overflow-hidden">
          <div className="sm:hidden min-w-[50px] h-[50px] rounded-full bg-white-2 centered">
            <FontAwesomeIcon icon={faMoneyBillTransfer} className="text-[20px] text-black" />
          </div>
          <div className="centered-y flex-wrap">
            <h3 className="sm:ml-0 font-rubik font-normal text-black text-[17px] ml-[15px] whitespace-nowrap truncate">
              You <span className="font-rubik font-medium">*{sender}</span>
            </h3>
            <div className="mx-[15px]">
              <FontAwesomeIcon
                icon={transfer_type ? faArrowLeft : faArrowRight}
                className={classNames(transfer_type ? 'text-green' : 'text-red', 'text-[20px]')}
              />
            </div>
            <h3 className="font-rubik font-normal text-black text-[17px] whitespace-nowrap truncate">
              Ukrainian Army <span className="font-rubik font-medium">*{receiver}</span>
            </h3>
          </div>
        </div>
        <div className="flex-1 mx-[25px] sm:m-0">
          <h3 className="font-rubik font-normal text-black/50 text-[17px]">{date}</h3>
        </div>
        <div className="centered-y flex-1 justify-end">
          <h3 className={classNames(transfer_type ? 'text-green' : 'text-red', 'title-sm font-medium')}>
            {transfer_type ? '+' : '-'}$
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

export default Transfer;

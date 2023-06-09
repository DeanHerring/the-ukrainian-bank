import React from 'react';
import logo from '@/images/logo.svg';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="sm:flex-col w-full bg-white-1 px-[5%] flex justify-between items-center bg-red">
      <div>
        <Link to="/" className="flex items-center py-[15px]">
          <img src={logo} alt="" />
          <h1 className="font-rubik font-medium text-black text-[24px] ml-[10px]">The Ukrainian Bank</h1>
        </Link>
      </div>
      <div className="flex items-center ml-[15px] py-[15px]">
        <div>
          <h3 className="font-rubik font-normal text-[17px] text-black/75 text-right">Balance</h3>
          <h1 className="font-rubik font-medium text-[17px] text-black">$182,192.00</h1>
        </div>
        <div className="ml-[10px]">
          <div>
            <img
              src="https://upload.wikimedia.org/wikipedia/en/d/da/Trevor_Philips.Grand_Theft_Auto_V.jpg"
              className="border border-white-2 border-[3px] w-[50px] h-[50px] rounded-full rounded-full"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

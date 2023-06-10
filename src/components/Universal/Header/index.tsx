import React from 'react';
import Logo from '../Logo';

const Header: React.FC = () => {
  return (
    <header className="sm:flex-col w-full bg-white-1 px-[5%] justify-between centered-y">
      <Logo />
      <div className="centered-y ml-[15px] py-[15px]">
        <div>
          <h3 className="title-sm text-black/75 text-right">Balance</h3>
          <h1 className="title-sm font-medium text-black">$182,192.00</h1>
        </div>
        <div className="ml-[10px]">
          <div>
            <img
              src="https://upload.wikimedia.org/wikipedia/en/d/da/Trevor_Philips.Grand_Theft_Auto_V.jpg"
              className="border-white-2 border-[3px] w-[50px] h-[50px] rounded-full"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

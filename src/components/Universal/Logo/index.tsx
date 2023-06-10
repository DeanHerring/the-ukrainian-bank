import React from 'react';
import logo from '@/images/logo.svg';

import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <header className="cursor-pointer">
      <Link to="/" className="centered-y">
        <img src={logo} alt="" />
        <h1 className="title-lg font-medium ml-[10px]">The Ukrainian Bank</h1>
      </Link>
    </header>
  );
};

export default Logo;

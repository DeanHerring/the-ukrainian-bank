import React, { useState } from 'react';
import Logo from '../Logo';
import Popover from '@mui/material/Popover';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useGetUserByTokenQuery } from '@/redux/api/api';

// @TODO: Подумать над улучшением этого компонента
const Header: React.FC = () => {
  const { data: user } = useGetUserByTokenQuery(localStorage.token);

  React.useEffect(() => {
    if (user) {
      localStorage.balance = user.body?.balance;
    }
  }, []);

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <header className="sm:flex-col w-full bg-white-1 px-[5%] justify-between centered-y py-[15px]">
      <Logo />
      {localStorage.balance ? (
        <div className="centered-y ml-[15px] py-[15px]">
          <div>
            <h3 className="title-sm text-black/75 text-right">Balance</h3>
            <h1 className="title-sm font-medium text-black">
              $
              {user?.body?.balance.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h1>
          </div>
          <div className="ml-[10px]">
            <div onClick={handleClick}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/d/da/Trevor_Philips.Grand_Theft_Auto_V.jpg"
                className="border-white-2 border-[3px] w-[50px] h-[50px] rounded-full"
              />
            </div>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              className="mt-[10px]"
            >
              <ul className="p-[5px]">
                <li className="centered-y justify-between p-[10px] rounded cursor-pointer duration-300 hover:bg-white-3">
                  <FontAwesomeIcon icon={faArrowRightFromBracket} />
                  <h3 className="title-sm ml-[25px]">Sign Out</h3>
                </li>
              </ul>
            </Popover>
          </div>
        </div>
      ) : (
        <div className="ml-[15px] py-[15px]">
          <Link to="/login" className="button">
            Войти
          </Link>
          <Link to="/signup" className="button">
            Создать аккаунт
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;

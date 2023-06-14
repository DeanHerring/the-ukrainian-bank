import React from 'react';
import Header from '@/components/Universal/Header';
import Container from '@/components/Universal/Container';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendUp, faPaperPlane, faArrowTrendDown, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { usePopover } from '@/hooks/usePopover';
import { Popover } from '@mui/material';
import { useGetCardListByOwnerQuery } from '@/redux/api/api';

const Transfer: React.FC = () => {
  const currencies: string[] = ['UAH', 'USD', 'PLN'];

  const { handleClick, handleClose, open, id, anchorEl, setAnchorEl } = usePopover();
  const { data: cards } = useGetCardListByOwnerQuery(localStorage.token);
  const [senderCard, setSenderCard] = React.useState<string>('');
  const [activeCurrency, setActiveCurrency] = React.useState<string>('UAH');

  const handleChange = (event: SelectChangeEvent): void => {
    setSenderCard(event.target.value as string);
  };

  const changeActiveCurrency = (currency: string): void => {
    setActiveCurrency(currency);
    setAnchorEl(null);
  };

  return (
    <>
      <Header />
      <Container>
        <section className="pb-[50px]">
          <div className="max-w-[90%] w-[1300px] mx-auto">
            <div className="my-[50px]">
              <div className="w-[700px] max-w-full bg-white-1 rounded-[10px] p-[25px] mx-auto">
                <header>
                  <h1 className="title-lg font-medium text-black">Transfer</h1>
                </header>
                <form className="mt-[35px]">
                  <div>
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faArrowTrendUp} className="text-black" />
                      <h3 className="title-md text-black ml-[10px]">From</h3>
                    </div>
                    <Select
                      disabled={!cards?.status && true}
                      value={senderCard}
                      onChange={handleChange}
                      className="bg-white-2 outline-none rounded-[10px] h-[50px] title-sm w-full shadow-none"
                    >
                      {cards?.body?.map((card, index) => {
                        const address = card.address.join('');

                        return (
                          <MenuItem value={address} className="bg-white-1" key={index}>
                            <div className="centered-y">
                              {card.address.map((chunk, index) => {
                                return (
                                  <p className="ml-[5px] first:ml-0" key={index}>
                                    {chunk}
                                  </p>
                                );
                              })}
                            </div>
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </div>

                  <div className="my-[10px] relative">
                    <div className="w-full h-[1px] bg-white-2 absolute top-1/2"></div>
                    <div className="group w-[60px] h-[60px] rounded-full bg-white-2 centered cursor-pointer duration-300 hover:bg-blue mx-auto relative z-10">
                      <FontAwesomeIcon
                        icon={faPaperPlane}
                        className="text-[20px] text-blue duration-300 group-hover:text-white-1"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="centered-y">
                      <FontAwesomeIcon icon={faArrowTrendDown} className="text-black" />
                      <h3 className="title-md text-black ml-[10px]">To</h3>
                    </div>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="focus:border-yellow border-[2px] border-white-1 bg-white-2 outline-none rounded-[10px] h-[50px] px-[14px] title-sm w-full"
                    />
                  </div>

                  <div className="mt-[50px]">
                    <header className="centered-y justify-between">
                      <h2 className="title-md text-black">Amount</h2>
                      <span className="font-rubik text-gray-1">$771.28</span>
                    </header>

                    <div className="mt-[15px]">
                      <h3 className="font-rubik text-red">Insufficient funds on the account</h3>
                      <div className="bg-white-2 h-[50px] rounded-[10px] centered-y px-[10px]">
                        <div
                          className="centered-y border-r-black/30 border-r-[1px] cursor-pointer"
                          onClick={handleClick}
                        >
                          <h3 className="font-rubik text-black/30">{activeCurrency}</h3>
                          <FontAwesomeIcon icon={faAngleDown} className="text-black/30 mx-[10px]" />
                        </div>
                        <Popover
                          id={id}
                          open={open}
                          anchorEl={anchorEl}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                          }}
                        >
                          <div className="bg-white-1">
                            <ul>
                              {currencies.map((currency) => {
                                return (
                                  <li
                                    onClick={() => changeActiveCurrency(currency)}
                                    key={currency}
                                    className="py-[5px] px-[15px] title-sm duration-300 hover:bg-white-2 cursor-pointer"
                                  >
                                    {currency}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </Popover>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full ml-[10px] font-rubik text-black bg-transparent outline-none"
                        />
                      </div>
                      <div className="centered-y justify-between sm-500:flex-col sm-500:items-start">
                        <h3 className="font-rubik text-black/75 text-[15px]">
                          The commission from each transfer is 4%
                        </h3>
                        <h3 className="font-rubik font-medium text-black">$13,54</h3>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
};

export default Transfer;

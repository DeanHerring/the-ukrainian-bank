import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faMoneyBillTransfer, faEllipsisVertical, faXmark } from '@fortawesome/free-solid-svg-icons';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/mousewheel';

import Header from '@/components/Universal/Header';
import Container from '@/components/Universal/Container';

const Main: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-white-2">
      <Header />

      <Container>
        <div className="my-[25px] p-[10px] bg-yellow/25 border border-[2px] border-yellow rounded-[10px] flex items-center justify-between">
          <h3 className="font-rubik font-normal text-black text-[17px]">
            Your debt on the loan is <span className="font-rubik font-medium">$182</span>
          </h3>
          <FontAwesomeIcon icon={faXmark} className="text-black cursor-pointer" />
        </div>

        <div>
          <header>
            <h1 className="font-rubik font-medium text-[30px] text-black">Credit Cards</h1>
          </header>

          <Swiper spaceBetween={30} slidesPerView="auto" className="mt-[20px]">
            <SwiperSlide className="flex flex-col cursor-pointer justify-center items-center w-[480px] h-[300px] rounded-[25px] bg-black/50 p-[25px] border border-[10px] border-white-3 border-double">
              <h1 className="font-rubik text-white-1 text-3xl">Создать новую карту</h1>
            </SwiperSlide>
            {[...new Array(5)].map((_, index) => {
              return (
                <SwiperSlide
                  key={index}
                  className="flex flex-col cursor-pointer justify-between w-[480px] h-[300px] rounded-[25px] bg-red-500 bg-card-2 bg-cover p-[25px]"
                >
                  <header className="flex items-center justify-between">
                    <h3 className="font-chivo text-white-1 font-normal text-[21px]">The Ukrainian Bank</h3>
                    <h1 className="font-chivo text-white-1 font-normal text-[21px]">UAH</h1>
                  </header>
                  <div>
                    <div className="font-chivo text-white-1 font-normal text-[39px] flex items-center justify-between">
                      <span>1234</span>
                      <span>5678</span>
                      <span>9012</span>
                      <span>3456</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-chivo text-white-1 font-normal text-[14px]">1234</h4>
                      <h4 className="font-chivo text-white-1 font-normal text-[14px]">debit</h4>
                    </div>
                  </div>
                  <footer className="flex items-center justify-between">
                    <h3 className="font-chivo text-white-1 font-normal text-[21px]">Stepan Neretin</h3>
                    <h3 className="font-chivo text-white-1 font-normal text-[21px]">09/29</h3>
                  </footer>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className="hidden swiper mySwiper mt-[20px]">
            <div className="swiper-wrapper">
              <div className="swiper-slide flex flex-col justify-between w-[480px] h-[300px] rounded-[25px] bg-red-500 bg-card-2 bg-cover p-[25px]">
                <header className="flex items-center justify-between">
                  <h3 className="font-chivo text-white-1 font-normal text-[21px]">The Ukrainian Bank</h3>
                  <h1 className="font-chivo text-white-1 font-normal text-[21px]">UAH</h1>
                </header>
                <div>
                  <div className="font-chivo text-white-1 font-normal text-[39px] flex items-center justify-between">
                    <span>1234</span>
                    <span>5678</span>
                    <span>9012</span>
                    <span>3456</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-chivo text-white-1 font-normal text-[14px]">1234</h4>
                    <h4 className="font-chivo text-white-1 font-normal text-[14px]">debit</h4>
                  </div>
                </div>
                <footer className="flex items-center justify-between">
                  <h3 className="font-chivo text-white-1 font-normal text-[21px]">Stepan Neretin</h3>
                  <h3 className="font-chivo text-white-1 font-normal text-[21px]">09/29</h3>
                </footer>
              </div>
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </div>

        <div className="p-[20px] rounded-[10px] bg-white-1 mt-[20px]">
          <header className="flex justify-between items-center">
            <h1 className="font-rubik font-medium text-black text-[20px]">Lastest Transactions</h1>
            <a className="font-rubik font-normal text-black/50 text-[17px] underline" href="#">
              See more
            </a>
          </header>
          <div className="mt-[50px]">
            <ul>
              <li className="mt-[15px] first:mt-0">
                <a
                  href="#"
                  className="sm:bg-white-2 sm:p-[10px] sm:flex-col sm:items-start flex items-center justify-between"
                >
                  <div className="flex flex-1 items-center overflow-hidden">
                    <div className="sm:hidden min-w-[50px] h-[50px] rounded-full bg-white-2 flex justify-center items-center">
                      <FontAwesomeIcon icon={faMoneyBillTransfer} className="text-[20px] text-black" />
                    </div>
                    <h3 className="sm:ml-0 font-rubik font-normal text-black text-[17px] ml-[15px] whitespace-nowrap truncate">
                      Перевод с карты на карту
                    </h3>
                  </div>
                  <div className="sm:ml-0 flex-1 mx-[25px]">
                    <h3 className="font-rubik font-normal text-black/50 text-[17px]">20.11.2023 16:21</h3>
                  </div>
                  <div className="flex flex-1 justify-end items-center">
                    <h3 className="font-rubik font-medium text-black/50 text-[17px] text-green">+$132,128</h3>
                    <div className="sm:hidden w-[50px] h-[50px] rounded-full bg-white-2 flex justify-center items-center ml-[15px] cursor-pointer">
                      <FontAwesomeIcon icon={faEllipsisVertical} className="text-[20px] text-black" />
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="p-[20px] rounded-[10px] bg-white-1 mt-[20px]">
          <header className="flex justify-between items-center">
            <h1 className="font-rubik font-medium text-black text-[20px]">Lastest Transfers</h1>
            <a className="font-rubik font-normal text-black/50 text-[17px] underline" href="#">
              See more
            </a>
          </header>
          <div className="mt-[50px]">
            <ul>
              <li className="mt-[15px] first:mt-0">
                <a
                  href="#"
                  className="sm:bg-white-2 sm:p-[10px] sm:flex-col sm:items-start transfers flex items-center justify-between"
                >
                  <div className="flex flex-1 items-center overflow-hidden">
                    <div className="sm:hidden min-w-[50px] h-[50px] rounded-full bg-white-2 flex justify-center items-center">
                      <FontAwesomeIcon icon={faMoneyBillTransfer} className="text-[20px] text-black" />
                    </div>
                    <div className="flex items-center flex-wrap">
                      <h3 className="sm:ml-0 font-rubik font-normal text-black text-[17px] ml-[15px] whitespace-nowrap truncate">
                        You <span className="font-rubik font-medium">*2189</span>
                      </h3>
                      <div className="mx-[15px]">
                        <FontAwesomeIcon icon={faArrowRight} className="text-[20px] text-red" />
                      </div>
                      <h3 className="font-rubik font-normal text-black text-[17px] whitespace-nowrap truncate">
                        Ukrainian Army <span className="font-rubik font-medium">*8211</span>
                      </h3>
                    </div>
                  </div>
                  <div className="transfers__date flex-1 mx-[25px] sm:m-0">
                    <h3 className="font-rubik font-normal text-black/50 text-[17px]">20.11.2023 16:21</h3>
                  </div>
                  <div className="transfers__amount flex flex-1 justify-end items-center">
                    <h3 className="font-rubik font-medium text-black/50 text-[17px] text-green">+$132,128</h3>
                    <div className="sm:hidden w-[50px] h-[50px] rounded-full bg-white-2 flex justify-center items-center ml-[15px] cursor-pointer">
                      <FontAwesomeIcon icon={faEllipsisVertical} className="text-[20px] text-black" />
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Main;

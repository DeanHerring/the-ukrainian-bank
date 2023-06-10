import React from 'react';
import Card from '@/components/Main/Card';

import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/mousewheel';

const CardList: React.FC = () => {
  return (
    <div>
      <header>
        <h1 className="title-lg font-medium text-black">Credit Cards</h1>
      </header>

      <Swiper spaceBetween={30} slidesPerView="auto" className="mt-[20px] flex">
        <SwiperSlide className="flex-col centered cursor-pointer w-[480px] h-[300px] rounded-[25px] bg-black/50 p-[25px] border-[10px] border-white-3 border-double">
          <Link to="/create_card">
            <h1 className="font-rubik text-white-1 text-3xl">Создать новую карту</h1>
          </Link>
        </SwiperSlide>

        {[...new Array(5)].map((_, index) => {
          return (
            <SwiperSlide
              key={index}
              className="flex flex-col bg-black cursor-pointer justify-between w-[480px] h-[300px] rounded-[25px] bg-card-2 bg-cover p-[25px]"
            >
              <Card
                publisher="The Ukrainian Bank"
                currency="UAH"
                address={['1234', '5678', '9012', '3456']}
                pin_code="4783"
                type="Debit"
                owner="Stepan Neretin"
                expiration_date="09/28"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default CardList;

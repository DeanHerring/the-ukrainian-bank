import React from 'react';
import Card from '@/components/Main/Card';

import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useGetCardListByOwnerQuery } from '@/redux/api/api';

import 'swiper/css';
import 'swiper/css/mousewheel';

const CardList: React.FC = () => {
  const { data: cards } = useGetCardListByOwnerQuery(localStorage.token);

  return (
    <div>
      <header>
        <h1 className="title-lg font-medium text-black">Credit Cards</h1>
      </header>

      <Swiper spaceBetween={30} slidesPerView="auto" className="mt-[20px] flex">
        <SwiperSlide className="w-[480px] h-[300px]">
          <Link
            to="/create_card"
            className="bg-black/75 w-full h-full centered rounded-[25px] cursor-pointer border-[10px] border-double"
          >
            <h1 className="font-rubik text-white-1 text-3xl">Создать новую карту</h1>
          </Link>
        </SwiperSlide>

        {cards?.body?.map((card, index) => {
          return (
            <SwiperSlide
              key={index}
              className="flex flex-col cursor-pointer justify-between w-[480px] h-[300px] rounded-[25px] bg-cover p-[25px] bg-black"
              style={{ backgroundImage: `url(${card.background})` }}
            >
              <Card
                publisher={card.publisher}
                currency={card.currency}
                address={card.address}
                pin_code={card.pin_code}
                type={card.type}
                full_name={card.full_name}
                expiration={card.expiration}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default CardList;

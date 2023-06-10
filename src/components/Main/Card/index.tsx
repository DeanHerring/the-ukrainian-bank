import React from 'react';

import { CardProps } from '@/interfaces/interfaces';

const Card: React.FC<CardProps> = ({ publisher, currency, address, pin_code, type, full_name, expiration }) => {
  return (
    <>
      <header className="flex centered-y justify-between">
        <h3 className="card-text-md">{publisher}</h3>
        <h1 className="card-text-md">{currency}</h1>
      </header>
      <div>
        <div className="card-text-lg centered-y justify-between">
          {address.map((chunk) => {
            return <span key={chunk}>{chunk}</span>;
          })}
        </div>
        <div className="centered-y justify-between">
          <h4 className="card-text-sm">{pin_code}</h4>
          <h4 className="card-text-sm">{type}</h4>
        </div>
      </div>
      <footer className="centered-y justify-between">
        <h3 className="card-text-md">{full_name}</h3>
        <h3 className="card-text-md">{expiration}</h3>
      </footer>
    </>
  );
};

export default Card;

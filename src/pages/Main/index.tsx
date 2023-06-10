import React from 'react';
import Header from '@/components/Universal/Header';
import Container from '@/components/Universal/Container';
import Alerts from '@/components/Universal/Alerts';
import CardList from '@/components/Main/CardList';
import TransactionList from '@/components/Main/TransactionList';
import TransferList from '@/components/Main/TransferList';

const Main: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-white-2">
      <Header />

      <Container>
        <Alerts text="Hello, world" type="notif"></Alerts>

        <CardList />
        <TransactionList />
        <TransferList />
      </Container>
    </div>
  );
};

export default Main;

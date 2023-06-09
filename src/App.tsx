import './App.css';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Test from '@/pages/Test';
import Main from '@/pages/Main';
import CreateCard from '@/pages/CreateCard';

import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className="App min-h-screen w-full bg-white-2">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create_card" element={<CreateCard />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  );
};

export default App;

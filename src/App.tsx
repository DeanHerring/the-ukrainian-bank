import './App.css';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Test from '@/pages/Test';

import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Hello from App</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </>
  );
};

export default App;

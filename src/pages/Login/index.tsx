import Logo from '@/components/Universal/Logo';
import FormHeader from '@/components/Universal/FormHeader';
import Alerts from '@/components/Universal/Alerts';
import LoginForm from '@/components/Login/LoginForm';
import { useState } from 'react';

// @TODO: Супер важно избавиться от дублирования компонентов SignupInput и LoginInput и сделать уникальный FormInput, который сможет принимать интерфейсы как SignupPerson, так и LoginPerson

const Login: React.FC = () => {
  const [error, setError] = useState<any>();

  return (
    <div className="min-h-screen w-full bg-white-2">
      <div className="flex">
        <div className="md-1100:w-1/2 md-800:w-full w-1/3 bg-white-1 h-screen p-[25px] flex flex-col">
          <Logo />
          <div className="w-full flex-col centered-x">
            <FormHeader header="Log In" description="Log in with your data that you entered during your registration" />

            {error?.length ? <Alerts text={error[0].message} type="error" /> : ''}

            <LoginForm passError={setError} />
          </div>
        </div>
        <div className="md-1100:w-1/2 md-800:hidden w-2/3 bg-login bg-cover h-screen"></div>
      </div>
    </div>
  );
};

export default Login;

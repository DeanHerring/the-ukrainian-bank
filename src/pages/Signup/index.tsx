import React, { useState } from 'react';
import FormHeader from '@/components/Universal/FormHeader';
import Logo from '@/components/Universal/Logo';
import SignupForm from '@/components/Signup/SignupForm';
import Alerts from '@/components/Universal/Alerts';

const Signup: React.FC = () => {
  const [error, setError] = useState<any>();

  return (
    <div className="min-h-screen w-full bg-white-2">
      <div className="flex">
        <div className="md-800:w-full md-1100:w-1/2 w-1/3 bg-white-1 h-screen p-[25px] flex flex-col">
          <Logo />
          <div className="w-full flex-col centered-x">
            <FormHeader
              header="Sign Up"
              description="Log in with your data that you entered during your registration"
            />
            {error?.length ? <Alerts text={error[0].message} type="error" /> : ''}
            <SignupForm passError={setError} />
          </div>
        </div>
        <div className="md-1100:w-1/2 md-800:hidden w-2/3 bg-login bg-cover h-screen"></div>
      </div>
    </div>
  );
};

export default Signup;

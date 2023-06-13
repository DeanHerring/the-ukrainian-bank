import React, { useEffect } from 'react';
import Input from '@/components/Universal/Input';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthUserMutation } from '@/redux/api/api';
import { LoginPerson } from '@/interfaces/interfaces';

import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().email('[EMAIL]: Невалидная почта.').required('[EMAIL]: Поле должно быть заполнено'),
  password: yup
    .string()
    .required('[PASSWORD]: Поле должно быть заполнено')
    .min(8, '[PASSWORD]: Минимум 8 символов')
    .max(40, '[PASSWORD]: Максимум 40 символов'),
});

interface LoginFormProps {
  passError: React.Dispatch<React.SetStateAction<any>>;
}

const LoginForm: React.FC<LoginFormProps> = ({ passError }) => {
  const [authUser] = useAuthUserMutation();
  const navigate = useNavigate();

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPerson>({ resolver: yupResolver(schema) });

  useEffect(() => {
    passError(Object.values(errors));
  }, [errors]);

  const onSubmit: SubmitHandler<LoginPerson> = (data) => {
    new Promise(async (resolve, reject) => {
      const result = await authUser(data).unwrap();

      result.status ? resolve(result) : reject(result.err);
    })
      .then((result: any) => {
        localStorage.token = result.token;
        navigate('/');
      })
      .catch((w) => {
        setError('email', { type: 'custom', message: w });
        passError([{ message: w }]);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        header="Enter your email address"
        type="email"
        placeholder="example@gmail.com"
        register={register}
        name="email"
      />
      <Input
        header="Enter your password"
        type="password"
        placeholder="atleast 8 characters"
        register={register}
        name="password"
      />
      <div>
        <div>
          <button className="bg-blue title-sm text-white-1 mt-[10px] w-full p-[10px] rounded-lg">Log In</button>
        </div>
        <div className="mt-[50px]">
          <div className="w-full h-[1px] bg-white-3"></div>
          <div className="centered-x mt-[25px]">
            <Link
              to="/signup"
              className="rounded-full border-[2px] border-blue py-[7px] px-[30px] title-md font-medium text-blue duration-300 hover:bg-blue hover:text-white-1"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;

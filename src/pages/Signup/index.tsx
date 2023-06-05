import logo from '@/images/logo.svg';
import classNames from 'classnames';
import React from 'react';
import FormHeader from '@/components/Universal/FormHeader';
import FormInput from '@/components/Universal/FormInput';
import FormCheckbox from '@/components/Universal/FormCheckbox';

import { yupResolver } from '@hookform/resolvers/yup';
import { useAddUserMutation } from '@/redux/api/api';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Person } from '@/interfaces/interfaces';

import * as yup from 'yup';
import s from './Signup.module.scss';

const schema = yup.object({
  email: yup.string().email('[EMAIL]: Невалидная почта.').required('[EMAIL]: Поле должно быть заполнено'),
  name: yup
    .string()
    .required('[NAME]: Поле должно быть заполнено')
    .min(3, '[NAME]: Минимум 3 символа')
    .max(12, '[NAME]: Максимум 12 символов')
    .matches(/^[A-Za-z0-9]+$/, '[NAME]: Поле не  должно содержать запрещённых символов'),
  password: yup
    .string()
    .required('[PASSWORD]: Поле должно быть заполнено')
    .min(8, '[PASSWORD]: Минимум 8 символов')
    .max(40, '[PASSWORD]: Максимум 40 символов'),
  confirmPassword: yup
    .string()
    .required('[CONFIM PASSWORD]: Поле должно быть заполнено')
    .min(8, '[CONFIM PASSWORD]: Миниумм 8 символов')
    .max(40, '[CONFIM PASSWORD]: Максимум 40 символов')
    .oneOf([yup.ref('password'), ''], '[CONFIM PASSWORD]: Пароли не совпадают'),
  agree: yup.boolean().oneOf([true], '[AGREE]: Согласитесь с правилами сайта'),
});

const Signup: React.FC = () => {
  const [addUser] = useAddUserMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Person>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<Person> = (data) => {
    new Promise(async (resolve, reject) => {
      const result = await addUser(data).unwrap();

      result.status ? resolve(result) : reject(result.err);
    })
      .then(() => {
        navigate('/');
      })
      .catch((w) => {
        setError('email', { type: 'custom', message: w });
      });
  };

  return (
    <div className="min-h-screen w-full bg-white-2">
      <div className={classNames(s.signup, 'flex')}>
        <div className={classNames(s.signup__body, 'w-1/3 bg-white-1 h-screen p-[25px] flex flex-col')}>
          <header>
            <Link to="/" className="flex items-center">
              <img src={logo} alt="" />
              <h1 className="font-rubik font-medium text-[24px] ml-[10px]">The Ukrainian Bank</h1>
            </Link>
          </header>
          <div className="w-full flex flex-col justify-center">
            <FormHeader
              header="Sign Up"
              description="Log in with your data that you entered during your registration"
            />
            <div
              className={classNames(
                !Object.values(errors).length && 'hidden',
                'w-full py-[5px] px-[15px] rounded-md border border-red bg-red/30 mb-[15px]',
              )}
            >
              <p className="font-rubik font-normal text-black">
                {Object.values(errors).length && Object.values(errors)[0].message}
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormInput
                header="Enter your email address"
                type="email"
                placeholder="example@gmail.com"
                register={register}
                name="email"
              />
              <FormInput
                header="Enter your name"
                type="text"
                placeholder="Scarlett Johansson"
                register={register}
                name="name"
              />
              <FormInput
                header="Enter your password"
                type="password"
                placeholder="atleast 8 characters"
                register={register}
                name="password"
              />
              <FormInput
                header="Confirm your password"
                type="password"
                placeholder="atleast 8 characters"
                register={register}
                name="confirmPassword"
              />
              <div>
                <div>
                  <input
                    type="submit"
                    value="Sign Up"
                    className="cursor-pointer bg-blue font-rubik font-normal text-[18px] text-white-1 mt-[10px] w-full p-[10px] rounded-lg"
                  />
                  <FormCheckbox title="I agree with rules" register={register} name="agree" />
                </div>
                <div className="mt-[50px]">
                  <div className="w-full h-[1px] bg-white-3"></div>
                  <div className="flex justify-center mt-[25px]">
                    <Link
                      to="/login"
                      className="rounded-full border border-[2px] border-blue py-[7px] px-[30px] font-rubik font-medium text-blue text-[21px] duration-300 hover:bg-blue hover:text-white-1"
                    >
                      Log In
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className={classNames(s.signup__background, 'w-2/3 bg-login bg-cover h-screen')}></div>
      </div>
    </div>
  );
};

export default Signup;

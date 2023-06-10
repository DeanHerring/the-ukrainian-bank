import React, { useEffect } from 'react';
import FormCheckbox from '@/components/Universal/FormCheckbox';
import Input from '@/components/Universal/Input';

import { yupResolver } from '@hookform/resolvers/yup';
import { useAddUserMutation } from '@/redux/api/api';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { SignupPerson } from '@/interfaces/interfaces';

import * as yup from 'yup';

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

interface SignupFormProps {
  passError: React.Dispatch<React.SetStateAction<any>>;
}

const SignupForm: React.FC<SignupFormProps> = ({ passError }) => {
  const [addUser] = useAddUserMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupPerson>({ resolver: yupResolver(schema) });

  useEffect(() => {
    passError(Object.values(errors));
  }, [errors]);

  const onSubmit: SubmitHandler<SignupPerson> = (data) => {
    new Promise(async (resolve, reject) => {
      const result = await addUser(data).unwrap();

      result.status ? resolve(result) : reject(result.err);
    })
      .then(() => {
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
      <Input header="Enter your name" type="text" placeholder="Scarlett Johansson" register={register} name="name" />
      <Input
        header="Enter your password"
        type="password"
        placeholder="atleast 8 characters"
        register={register}
        name="password"
      />
      <Input
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
            className="cursor-pointer bg-blue title-md text-white-1 mt-[10px] w-full p-[10px] rounded-lg"
          />
          <FormCheckbox title="I agree with rules" register={register} name="agree" />
        </div>
        <div className="mt-[50px]">
          <div className="w-full h-[1px] bg-white-3"></div>
          <div className="centered-x mt-[25px]">
            <Link
              to="/login"
              className="rounded-full border-[2px] border-blue py-[7px] px-[30px] title-md font-medium text-blue duration-300 hover:bg-blue hover:text-white-1"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignupForm;

import logo from '@/images/logo.svg';
import classNames from 'classnames';
import s from './Login.module.scss';
import * as yup from 'yup';
import FormHeader from '@/components/Universal/FormHeader';
import LoginInput from './LoginInput';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthUserMutation } from '@/redux/api/api';
import { LoginPerson } from '@/interfaces/interfaces';
import Alerts from '@/components/Universal/Alerts';

const schema = yup.object({
  email: yup.string().email('[EMAIL]: Невалидная почта.').required('[EMAIL]: Поле должно быть заполнено'),
  password: yup
    .string()
    .required('[PASSWORD]: Поле должно быть заполнено')
    .min(8, '[PASSWORD]: Минимум 8 символов')
    .max(40, '[PASSWORD]: Максимум 40 символов'),
});

// @TODO: Супер важно избавиться от дублирования компонентов SignupInput и LoginInput и сделать уникальный FormInput, который сможет принимать интерфейсы как SignupPerson, так и LoginPerson

const Login: React.FC = () => {
  const [authUser] = useAuthUserMutation();
  const navigate = useNavigate();

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPerson>({ resolver: yupResolver(schema) });
  const err = Object.values(errors);

  const onSubmit: SubmitHandler<LoginPerson> = (data) => {
    console.log(data);
    new Promise(async (resolve, reject) => {
      const result = await authUser(data).unwrap();

      result.status ? resolve(result) : reject(result.err);
    })
      .then((q: any) => {
        localStorage.id = q.body.id;
        localStorage.balance = q.body.balance;

        navigate('/');
      })
      .catch((w) => {
        setError('email', { type: 'custom', message: w });
      });
  };

  return (
    <div className="min-h-screen w-full bg-white-2">
      <div className={classNames(s.login, 'flex')}>
        <div className={classNames(s.login__body, 'w-1/3 bg-white-1 h-screen p-[25px] relative flex')}>
          <header>
            <Link to="/" className="flex items-center absolute top-[25px] left-[25px]">
              <img src={logo} alt="" />
              <h1 className="font-rubik font-medium text-[24px] ml-[10px]">The Ukrainian Bank</h1>
            </Link>
          </header>
          <div className="w-full flex flex-col justify-center">
            <FormHeader header="Log In" description="Log in with your data that you entered during your registration" />

            {err.length ? <Alerts text={err[0].message} /> : ''}

            <form onSubmit={handleSubmit(onSubmit)}>
              <LoginInput
                header="Enter your email address"
                type="email"
                placeholder="example@gmail.com"
                register={register}
                name="email"
              />
              <LoginInput
                header="Enter your password"
                type="password"
                placeholder="atleast 8 characters"
                register={register}
                name="password"
              />
              <div>
                <div>
                  <button className="bg-blue font-rubik font-normal text-[18px] text-white-1 mt-[10px] w-full p-[10px] rounded-lg">
                    Log In
                  </button>
                </div>
                <div className="mt-[50px]">
                  <div className="w-full h-[1px] bg-white-3"></div>
                  <div className="flex justify-center mt-[25px]">
                    <Link
                      to="/signup"
                      className="rounded-full border border-[2px] border-blue py-[7px] px-[30px] font-rubik font-medium text-blue text-[21px] duration-300 hover:bg-blue hover:text-white-1"
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className={classNames(s.login__background, 'w-2/3 bg-login bg-cover h-screen')}></div>
      </div>
    </div>
  );
};

export default Login;

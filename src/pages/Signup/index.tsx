import logo from '@/images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import s from './Signup.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAddUserMutation } from '@/redux/api/api';

const schema = yup.object({
  email: yup.string().email('Invalid email.').required('The field cannot be empty.'),
  name: yup
    .string()
    .required('The field cannot be empty.')
    .min(3, 'Minimum length 3 characters.')
    .max(12, 'Maximum length 12 characters.')
    .matches(/^[A-Za-z0-9]+$/, 'Field contains invalid characters.'),
  password: yup
    .string()
    .required('The field cannot be empty.')
    .min(8, 'Minimum length 8 characters.')
    .max(40, 'Maximum length 40 characters.'),
  confirmPassword: yup
    .string()
    .required('The field cannot be empty.')
    .min(8, 'Minimum length 8 characters.')
    .max(40, 'Maximum length 40 characters.')
    .oneOf([yup.ref('password'), ''], 'Passwords must match.'),
  agree: yup.boolean().oneOf([true], 'You must agree to the terms and conditions.'),
});

interface IPerson extends yup.InferType<typeof schema> {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
}

const Signup = () => {
  const [addUser] = useAddUserMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPerson>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<IPerson> = (data) => {
    console.log(data);
    // Регаем чела
    new Promise(async (resolve, reject) => {
      const result = await addUser(data).unwrap();

      result.status ? resolve(result) : reject(result.err);
    })
      .then((q) => {
        navigate('/');
      })
      .catch((w) => {
        console.log('Signup Error Catch: ', w);
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
            <div className="my-[50px]">
              <h1 className="font-rubik font-bold text-[40px] font-bold text-black">Sign Up</h1>
              <h3 className="font-rubik font-normal text-black/30">
                Log in with your data that you entered during your registration
              </h3>
            </div>
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
              <div className="flex flex-col mt-[25px] first:mt-0">
                <span className="font-rubik font-normal text-black">Enter your email address</span>
                <input
                  type="email"
                  className="focus:border-yellow border border-[2px] border-[#EFEFEF] bg-transparent outline-none rounded py-[7px] px-[14px] font-rubik font-normal mt-[10px]"
                  placeholder="example@gmail.com"
                  {...register('email')}
                />
              </div>
              <div className="flex flex-col mt-[25px] first:mt-0">
                <span className="font-rubik font-normal text-black">Enter your name</span>
                <input
                  type="text"
                  className="focus:border-yellow border border-[2px] border-white-3 bg-transparent outline-none rounded py-[7px] px-[14px] font-rubik font-normal mt-[10px]"
                  placeholder="Scarlett Johansson"
                  {...register('name')}
                />
              </div>
              <div className="flex flex-col mt-[25px] first:mt-0">
                <span className="font-rubik font-normal text-black">Enter your password</span>
                <input
                  type="password"
                  className="focus:border-yellow border border-[2px] border-white-3 bg-transparent outline-none rounded py-[7px] px-[14px] font-rubik font-normal mt-[10px]"
                  placeholder="atleast 8 characters"
                  {...register('password')}
                />
              </div>
              <div className="flex flex-col mt-[25px] first:mt-0">
                <span className="font-rubik font-normal text-black">Repeat your password</span>
                <input
                  type="password"
                  className="focus:border-yellow border border-[2px] border-white-3 bg-transparent outline-none rounded py-[7px] px-[14px] font-rubik font-normal mt-[10px]"
                  placeholder="atleast 8 characters"
                  {...register('confirmPassword')}
                />
              </div>
              <div>
                <div>
                  <input
                    type="submit"
                    value="Sign Up"
                    className="cursor-pointer bg-blue font-rubik font-normal text-[18px] text-white-1 mt-[10px] w-full p-[10px] rounded-lg"
                  />
                  <div className="flex items-center mt-[10px] justify-center">
                    <input type="checkbox" {...register('agree')} />
                    <a href="#" className="font-rubik font-normal text-black ml-[10px] underline">
                      I agree with rules
                    </a>
                  </div>
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

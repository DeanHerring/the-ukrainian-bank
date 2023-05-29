import { faCheck } from '@fortawesome/free-solid-svg-icons';
import logo from '../../images/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import s from './Login.module.scss';

const Login = () => {
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
            <div className="my-[50px]">
              <h1 className="font-rubik font-bold text-[40px] font-bold text-black">Log In</h1>
              <h3 className="font-rubik font-normal text-black/30">
                Log in with your data that you entered during your registration
              </h3>
            </div>
            <form>
              <div className="flex flex-col mt-[25px] first:mt-0">
                <span className="font-rubik font-normal text-black">Enter your email address</span>
                <input
                  type="text"
                  className="focus:border-yellow border border-[2px] border-[#EFEFEF] bg-transparent outline-none rounded py-[7px] px-[14px] font-rubik font-normal mt-[10px]"
                  placeholder="example@gmail.com"
                />
              </div>
              <div className="flex flex-col mt-[25px] first:mt-0">
                <span className="font-rubik font-normal text-black">Enter your password</span>
                <input
                  type="password"
                  className="focus:border-yellow border border-[2px] border-white-3 bg-transparent outline-none rounded py-[7px] px-[14px] font-rubik font-normal mt-[10px]"
                  placeholder="atleast 8 characters"
                />
              </div>
              <div>
                <div>
                  <button className="bg-blue font-rubik font-normal text-[18px] text-white-1 mt-[10px] w-full p-[10px] rounded-lg">
                    Log In
                  </button>
                  <div className="flex items-center mt-[10px] justify-center">
                    <div className="w-[25px] h-[25px] rounded border border-[2px] border-blue flex justify-center items-center cursor-pointer">
                      <FontAwesomeIcon icon={faCheck} className="text-blue" />
                    </div>
                    <a href="#" className="font-rubik font-normal text-black ml-[10px] underline">
                      I agree with rules
                    </a>
                  </div>
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

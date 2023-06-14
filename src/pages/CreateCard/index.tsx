import React, { useState, useRef } from 'react';
import Header from '@/components/Universal/Header';
import Container from '@/components/Universal/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/mousewheel';
import classNames from 'classnames';
import Popover from '@mui/material/Popover';
import { cardBackgrounds } from '@/images/images';
import {
  useGetCountryDialingCodesQuery,
  useGetTariffsQuery,
  useUploadPassportMutation,
  useCreateCardMutation,
} from '@/redux/api/api';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import Alerts from '@/components/Universal/Alerts';
import { Tariffs, Card } from '@/interfaces/interfaces';
import { useNavigate } from 'react-router-dom';
import { usePopover } from '@/hooks/usePopover';

interface Country {
  flag: string;
  dialing_code: number;
}

type Passport = FileList | null | undefined;

const schema = yup.object({
  full_name: yup.string().required('[full namn]: Поле должно быть заполненно'),
  card_type: yup.string().required('[card type]: Поле должно быть заполненно'),
  currency: yup.string().required('[currency]: Поле должно быть заполненно'),
  pin_code: yup
    .number()
    .positive()
    .integer()
    .min(1000, '[pin code]: 4 символа')
    .max(9999, '[pin code]: 4 символа')
    .typeError('[pin code]: Неверный формат пин-кода')
    .required('[pin code]: Поле должно быть заполненно'),
  tariff_plan_id: yup.number().default(1).required('[tariff plan]: Поле должно быть заполненно'),
  monthly_limit: yup.number().positive().integer().required('[monthly limit]: Поле должно быть заполненно'),
  daily_limit: yup.number().positive().integer().required('[daily limit]: Поле должно быть заполненно'),
  phone: yup.string().required('[phone]: Поле должно быть заполненно'),
  email: yup.string().email('[EMAIL]: Невалидная почта.').required('[EMAIL]: Поле должно быть заполнено'),
  passport: yup.string().required('[passport]: Загрузите своё ебало нахуй!'),
  card_background: yup.string(),
});

// @TODO: Отрефакторить этот компонент во время следующего рефакторинга
const CreateCard: React.FC = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({ resolver: yupResolver(schema) });
  const err: any = Object.values(errors);

  const defaultDialingCode: Country = {
    flag: '/src/images/country_flags/UA.svg',
    dialing_code: 380,
  };
  const defaultTariff: Tariffs = {
    id: 1,
    title: 'Standard',
    monthly_limit: 100000,
    daily_limit: 5000,
  };

  const cardTypes: string[] = ['Debit', 'Credit'];
  const currencies: string[] = ['USD', 'UAH', 'EUR', 'PLN', 'JPY'];

  const [activeBackground, setActiveBackground] = useState<number>(0);
  const [dialingCode, setDialingCode] = useState<Country>(defaultDialingCode);
  const [activeTariff, setActiveTariff] = useState<Tariffs>(defaultTariff);
  const [passport, setPassport] = useState<string>('Загрузите фотографию');

  const uploadFileRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const { data: countries } = useGetCountryDialingCodesQuery(null);
  const { data: tariffs } = useGetTariffsQuery(null);
  const { handleClick, handleClose, open, id, anchorEl, setAnchorEl } = usePopover();

  const [uploadPassport] = useUploadPassportMutation();
  const [createCard] = useCreateCardMutation();

  const changeDialingCode = (country: Country): void => {
    setDialingCode(country);
    setAnchorEl(null);
  };

  const handlePassport = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    uploadFileRef.current?.click();
  };

  const getPassport = (): void => {
    const files: Passport = uploadFileRef.current?.files;

    if (files) {
      const formData: FormData = new FormData();
      formData.append('passport', files[0]);

      new Promise(async (resolve, reject) => {
        const result = await uploadPassport(formData).unwrap();

        result.status ? resolve(result) : reject(result.err);
      })
        .then((data: any) => {
          setPassport(files[0].name);
          setValue('passport', data.filename, { shouldValidate: true });
        })
        .catch((w) => {
          console.log('Error: ', w);
        });
    }
  };

  const onSubmit: SubmitHandler<Card> = (data): void => {
    new Promise(async (resolve, reject) => {
      const result = await createCard({ ...data, token: localStorage.token }).unwrap();

      result.status ? resolve(result) : reject(result.err);
    })
      .then(() => navigate('/'))
      .catch((err) => console.log('Create Card Error: ', err));
  };

  const changeActiveTariff = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const id = parseInt(e.target.value);
    const tariff = tariffs?.body?.filter((tariff) => tariff.id === id);

    if (tariff) {
      setActiveTariff(tariff[0]);

      setValue('monthly_limit', tariff[0].monthly_limit);
      setValue('daily_limit', tariff[0].daily_limit);
    }

    setValue('tariff_plan_id', id, { shouldValidate: true });
  };

  const changeCardBackground = (index: number, url: string): void => {
    setActiveBackground(index);
    setValue('card_background', url);
  };

  return (
    <>
      <Header />

      <Container>
        <header>
          <h1 className="title-lg font-medium text-black">Create a digital bank card</h1>
        </header>

        {err.length ? <Alerts text={err[0].message} type="error" /> : ''}

        <form className="mt-[50px]" encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-[15px] first:mt-0">
            <h3 className="font-rubik text-black">Enter Your Full Name</h3>
            <input
              type="text"
              placeholder="Stepan Neretin Stepanovich"
              className="w-full py-[10px] px-[15px] rounded-md mt-[5px] font-rubik outline-none"
              autoComplete="off"
              defaultValue="Stepan Neretin Stepanovich"
              {...register('full_name')}
            />
          </div>
          <div className="mt-[15px] first:mt-0 grid grid-cols-31 gap-[15px] md-800:grid-cols-2 sm-500:grid-cols-1">
            <div>
              <h3 className="font-rubik text-black">Card Type</h3>
              <select
                className="w-full py-[10px] px-[15px] rounded-md mt-[5px] font-rubik outline-none"
                {...register('card_type')}
              >
                {cardTypes.map((cardType) => {
                  return (
                    <option value={cardType} key={cardType}>
                      {cardType}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <h3 className="font-rubik text-black">Currency</h3>
              <select
                className="w-full py-[10px] px-[15px] rounded-md mt-[5px] font-rubik outline-none"
                {...register('currency')}
              >
                {currencies.map((currency) => {
                  return (
                    <option value={currency} key={currency}>
                      {currency}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <h3 className="font-rubik text-black">Pin Code</h3>
              <input
                type="text"
                placeholder="2371"
                className="w-full py-[10px] px-[15px] rounded-md mt-[5px] font-rubik outline-none"
                autoComplete="off"
                defaultValue="1234"
                {...register('pin_code')}
              />
            </div>
            <div>
              <h3 className="font-rubik text-black">Tariff Plan</h3>
              <select
                className="w-full py-[10px] px-[15px] rounded-md mt-[5px] font-rubik outline-none"
                onChange={(e) => changeActiveTariff(e)}
              >
                {tariffs?.body?.map((tariff) => {
                  return (
                    <option key={tariff.title} value={tariff.id}>
                      {tariff.title}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="mt-[15px] first:mt-0 grid grid-cols-2 gap-[15px] sm-500:grid-cols-1">
            <div className="mt-[15px]">
              <h3 className="font-rubik text-black">Monthly Limit</h3>
              <input
                type="text"
                placeholder="$100,000"
                value={activeTariff.monthly_limit}
                className="w-full py-[10px] px-[15px] rounded-md mt-[5px] font-rubik outline-none"
                autoComplete="off"
                {...register('monthly_limit')}
              />
            </div>
            <div className="mt-[15px]">
              <h3 className="font-rubik text-black">Dayli Limit</h3>
              <input
                type="text"
                placeholder="$25,000"
                value={activeTariff.daily_limit}
                className="w-full py-[10px] px-[15px] rounded-md mt-[5px] font-rubik outline-none"
                autoComplete="off"
                {...register('daily_limit')}
              />
            </div>
          </div>
          <div className="mt-[15px] first:mt-0">
            <h3 className="font-rubik text-black">Enter Your Phone</h3>
            <div className="bg-white-1 flex rounded-md py-[10px] px-[15px] mt-[5px]">
              <div className="centered-y cursor-pointer" onClick={handleClick}>
                <img src={dialingCode.flag} className="w-[30px] h-[18px] rounded mr-[10px]" />
                <FontAwesomeIcon icon={faCaretUp} className={classNames('text-black', anchorEl && 'rotate-180')} />
              </div>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <div className="bg-white-1">
                  <ul>
                    {countries?.body?.map((country) => {
                      return (
                        <li
                          key={country.dialing_code}
                          onClick={() => changeDialingCode(country)}
                          className="centered-y justify-between p-[10px] cursor-pointer duration-300 hover:bg-white-3"
                        >
                          <div className="centered-y">
                            <img src={country.flag} className="w-[30px] h-[18px] rounded" />
                            <h3 className="font-rubik text-black ml-[10px]">{country.country}</h3>
                          </div>

                          <h3 className="font-rubik text-black ml-[15px]">+{country.dialing_code}</h3>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Popover>
              <input
                type="text"
                placeholder={`+${dialingCode.dialing_code}`}
                className="w-full font-rubik outline-none ml-[10px] bg-transparent"
                autoComplete="off"
                {...register('phone')}
              />
            </div>
          </div>
          <div className="mt-[15px] first:mt-0">
            <h3 className="font-rubik text-black">Enter Your Email</h3>
            <input
              type="text"
              placeholder="example@gmail.com"
              defaultValue="example@gmail.com"
              className="w-full py-[10px] px-[15px] rounded-md mt-[5px] font-rubik outline-none"
              autoComplete="off"
              {...register('email')}
            />
          </div>
          <div className="mt-[15px] first:mt-0">
            <h3 className="font-rubik text-black">Upload your passport</h3>
            <div className="centered-y">
              <input
                autoComplete="off"
                ref={uploadFileRef}
                onChange={() => getPassport()}
                name="image"
                type="file"
                className="hidden"
              />
              <button
                onClick={(e) => handlePassport(e)}
                className="bg-white-1 rounded-md px-[15px] py-[10px] font-rubik text-black mt-[5px]"
              >
                Upload
              </button>
              <h3 className="font-rubik text-black ml-[10px]">{passport}</h3>
            </div>
          </div>
          <div className="mt-[15px] first:mt-0">
            <h3 className="font-rubik text-black">
              Card Backround <span className="font-rubik text-black/50">(optional)</span>
            </h3>
            <Swiper spaceBetween={30} slidesPerView="auto" className="mt-[20px]">
              {cardBackgrounds.map((url, index) => {
                return (
                  <SwiperSlide
                    key={url}
                    className="group w-[480px] h-[300px] bg-green rounded-[10px] cursor-pointer"
                    onClick={() => changeCardBackground(index, url)}
                    style={{ backgroundImage: `url(${url})`, backgroundSize: 'cover' }}
                  >
                    <div
                      className={classNames(
                        activeBackground === index && 'opacity-100',
                        'w-full h-full rounded-[10px] opacity-0 duration-300 bg-[#000]/50 group-hover:opacity-100 flex justify-center items-center',
                      )}
                    >
                      <div
                        className={classNames(
                          activeBackground === index && 'bg-white-1',
                          'w-[100px] h-[100px] rounded-full flex justify-center items-center border-[5px] border-white-1',
                        )}
                      >
                        <FontAwesomeIcon
                          icon={faCheck}
                          className={classNames(
                            activeBackground === index ? 'text-black' : 'text-white-1',
                            'text-[50px] text-black',
                          )}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <input
            type="submit"
            value="Create"
            autoComplete="off"
            className="bg-white-3 mt-[15px] py-[10px] px-[25px] rounded-md font-rubik text-black duration-300 cursor-pointer hover:bg-blue hover:text-white-1"
          />
        </form>
      </Container>
    </>
  );
};

export default CreateCard;

export interface Countries {
  country: string;
  flag: string;
  dialing_code: number;
}

export interface Tariffs {
  id: number;
  title: string;
  monthly_limit: number;
  daily_limit: number;
}

export interface IUser {
  email: string;
  name: string;
  password: string;
  agree: boolean;
}

export interface SignupPerson {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
}

export interface LoginPerson {
  email: string;
  password: string;
}

export interface Card {
  full_name: string;
  type: string;
  expiration: string;
  currency: string;
  publisher?: string;
  balance: number;
  address: string;
  pin_code: string;
  monthly_limit: number;
  background?: string;
  daily_limit: number;
  available?: boolean;
  passport: string;
  phone: string;
  email: string;
  tariff_plan_id: number;
  owner_id: number;
}

export interface CardProps {
  publisher: string;
  currency: string;
  address: string[];
  pin_code: string;
  type: string;
  full_name: string;
  expiration: string;
  background?: string;
}

// Api Interfaces
export interface AuthBodyResponce {
  id: number;
  balance: number;
}

export interface DefaultApiResponce {
  status: number;
  err?: string;
}

export interface ApiCountriesResponce extends DefaultApiResponce {
  body?: Countries[];
}

export interface ApiTarrifsResponce extends DefaultApiResponce {
  body?: Tariffs[];
}

export interface ApiPassportResponce extends DefaultApiResponce {
  filename?: string;
}

export interface ApiAuthUserResponce extends DefaultApiResponce {
  body?: AuthBodyResponce;
}

export interface ApiCardResponce extends DefaultApiResponce {
  body?: CardProps[];
}

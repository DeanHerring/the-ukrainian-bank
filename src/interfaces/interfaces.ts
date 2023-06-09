export interface AuthBodyResponce {
  id: number;
  balance: number;
}

export interface DefaultApiResponce {
  status: number;
  err?: string;
}

export interface ApiResponce extends DefaultApiResponce {
  body?: AuthBodyResponce;
}

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

export interface ApiCountriesResponce extends DefaultApiResponce {
  body?: Countries[];
}

export interface ApiTarrifsResponce extends DefaultApiResponce {
  body?: Tariffs[];
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

// @TODO: Изменить на более уникальное название
export interface LoginPerson {
  email: string;
  password: string;
}

export interface ApiPassportResponce extends DefaultApiResponce {
  filename?: string;
}

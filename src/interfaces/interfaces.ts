export interface AuthBodyResponce {
  id: number;
  balance: number;
}

export interface ApiResponce {
  status: number;
  err?: string;
  body?: AuthBodyResponce;
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

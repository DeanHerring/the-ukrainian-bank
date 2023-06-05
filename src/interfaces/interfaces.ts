export interface IAddUserResponce {
  status: number;
  err?: string;
}

export interface IUser {
  email: string;
  name: string;
  password: string;
  agree: boolean;
}

export interface Person {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
}

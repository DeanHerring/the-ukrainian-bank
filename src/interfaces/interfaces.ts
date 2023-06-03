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

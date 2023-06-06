import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser, ApiResponce, LoginPerson } from '@/interfaces/interfaces';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  endpoints: (build) => ({
    addUser: build.mutation<ApiResponce, IUser>({
      query: (body: IUser) => ({
        url: `addUser`,
        method: 'POST',
        body,
      }),
    }),
    authUser: build.mutation<ApiResponce, LoginPerson>({
      query: (body: LoginPerson) => ({
        url: `authUser`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useAddUserMutation, useAuthUserMutation } = api;

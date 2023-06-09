import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IUser,
  ApiResponce,
  LoginPerson,
  ApiCountriesResponce,
  ApiTarrifsResponce,
  ApiPassportResponce,
} from '@/interfaces/interfaces';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  endpoints: (build) => ({
    getCountryDialingCodes: build.query<ApiCountriesResponce, null>({
      query: () => `/getCountryDialingCodes`,
    }),
    getTariffs: build.query<ApiTarrifsResponce, null>({
      query: () => `/getTariffs`,
    }),

    // Mutatuins
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
    uploadPassport: build.mutation<ApiPassportResponce, FormData>({
      query: (body: FormData) => ({
        url: `uploadPassport`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useAddUserMutation,
  useAuthUserMutation,
  useGetTariffsQuery,
  useUploadPassportMutation,
  useGetCountryDialingCodesQuery,
} = api;

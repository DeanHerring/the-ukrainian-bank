import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IUser,
  LoginPerson,
  ApiCountriesResponce,
  ApiTarrifsResponce,
  ApiPassportResponce,
  Card,
  DefaultApiResponce,
  ApiAuthUserResponce,
  CardProps,
  ApiCardResponce,
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
    getCardsByOwner: build.query<ApiCardResponce, number>({
      query: (owner_id: number) => `/getCardsByOwner/${owner_id}`,
    }),

    // Mutatuins
    addUser: build.mutation<DefaultApiResponce, IUser>({
      query: (body: IUser) => ({
        url: `addUser`,
        method: 'POST',
        body,
      }),
    }),
    authUser: build.mutation<ApiAuthUserResponce, LoginPerson>({
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
    createCard: build.mutation<DefaultApiResponce, Card>({
      query: (body: Card) => ({
        url: `createCard`,
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
  useCreateCardMutation,
  useGetCountryDialingCodesQuery,
  useGetCardsByOwnerQuery,
} = api;

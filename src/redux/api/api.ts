import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser, IAddUserResponce } from '@/interfaces/interfaces';

export const api = createApi({
  reducerPath: 'api',
  // tagTypes: ['Documents'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  endpoints: (build) => ({
    // Get
    // getUser: build.query({
    //   query: (id) => `getUser/${id}`,
    // }),
    // Post
    // createDocument: build.mutation({
    //   query: (body) => ({
    //     url: `createDocument`,
    //     method: 'POST',
    //     body,
    //   }),
    //   invalidatesTags: ['Documents'],
    // }),
    addUser: build.mutation<IAddUserResponce, IUser>({
      query: (body: IUser) => ({
        url: `addUser`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useAddUserMutation } = api;

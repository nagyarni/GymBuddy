import { apiSlice } from '../../app/api/api-slice'

export const clientsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getClientsByUserId: builder.query({
      query: params => ({
        url: `/users/${params.id}/clients`,
        method: 'GET',
      }),
      providesTags: ['AllUsers']
    }),
    getAllUsers: builder.query({
      query: params => ({
        url: '/users',
        method: 'GET',
      }),
      providesTags: ['AllUsers']
    }),
    deleteUserById: builder.mutation({
      query: params => ({
        url: `/users/${params.userid}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['AllUsers']
    }),
    deleteClientFromCoach: builder.mutation({
      query: params => ({
        url: `/users/${params.userid}/clients/${params.clientid}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['AllUsers']
    }),
    addClientToCoach: builder.mutation({
      query: params => ({
        url: `/users/${params.coachid}/clients`,
        body: { ...params },
        method: 'POST'
      }),
      invalidatesTags: ['AllUsers']
    })
  })
})
// query or mutation based on get / something else
export const {
  useGetClientsByUserIdQuery,
  useGetAllUsersQuery,
  useDeleteUserByIdMutation,
  useDeleteClientFromCoachMutation,
  useAddClientToCoachMutation,
} = clientsApiSlice
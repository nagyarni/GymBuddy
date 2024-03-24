import { apiSlice } from '../../app/api/api-slice'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/auth/login',
        method: 'POST',
        body: { ...credentials }
      })
    }),
    register: builder.mutation({
      query: credentials => ({
        url: '/auth/register',
        method: 'POST',
        body: {...credentials}
      })
    }),
    updateUser: builder.mutation({
      query: credentials => ({
        url: `users/${credentials.userid}`,
        method: 'PATCH',
        body: {...credentials}
      })
    })
  })
})
// query or mutation based on get / something else
export const {
  useLoginMutation,
  useRegisterMutation,
  useUpdateUserMutation
} = authApiSlice
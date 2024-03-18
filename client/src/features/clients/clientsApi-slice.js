import { apiSlice } from '../../app/api/api-slice'

export const clientsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getClientsByUserId: builder.query({
      query: params => ({
        url: `/users/${params.id}/clients`,
        method: 'GET',
        invalidateTags: [Date.now().toString()], // Unique value to disable caching
      })
    }),

  })
})
// query or mutation based on get / something else
export const {
  useGetClientsByUserIdQuery,

} = clientsApiSlice
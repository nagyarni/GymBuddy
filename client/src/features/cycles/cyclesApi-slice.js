import { apiSlice } from '../../app/api/api-slice'

export const cyclesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCyclesByUserId: builder.query({
      query: params => ({
        url: `/users/${params.id}/cycles`,
        method: 'GET'
      })
    }),
    patchCyclesByUserId: builder.mutation({
      query: params => ({
        url: `/users/${params.id}/cycles/${params.cycleid}`,
        method: 'PATCH',
        body: params.cycle
      })
    }),
  })
})
// query or mutation based on get / something else
export const {
  useGetCyclesByUserIdQuery,
  usePatchCyclesByUserIdMutation
} = cyclesApiSlice
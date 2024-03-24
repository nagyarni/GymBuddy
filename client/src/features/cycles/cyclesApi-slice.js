import { apiSlice } from '../../app/api/api-slice'

export const cyclesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCyclesByUserId: builder.query({
      query: params => ({
        url: `/users/${params.id}/cycles`,
        method: 'GET',
      }),
      providesTags: ['Cycles']
    }),
    getCycleDataByCycleId: builder.query({
      query: params => ({
        url: `/users/${params.id}/cycles/${params.cycleid}`,
        method: 'GET',
      }),
      providesTags: ['CycleData']
    }),
    patchCycleByUserIdAndCycleId: builder.mutation({
      query: params => ({
        url: `/users/${params.id}/cycles/${params.cycleid}`,
        method: 'PATCH',
        body: params.cycle
      }),
      invalidatesTags: ['CycleData']
    }),

    // Cycle DELETE and POST
    postCycleByUserId: builder.mutation({
      query: params => ({
        url: `/users/${params.id}/cycles`,
        method: 'POST',
        body: params.cycle
      }),
      invalidatesTags: ['Cycles']
    }),
    deleteCycleByUserIdAndCycleId: builder.mutation({
      query: params => ({
        url: `/users/${params.id}/cycles/${params.cycleid}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Cycles']
    })
  })
})
// query or mutation based on get / something else
export const {
  useGetCyclesByUserIdQuery,
  usePatchCycleByUserIdAndCycleIdMutation,
  useGetCycleDataByCycleIdQuery,
  usePostCycleByUserIdMutation,
  useDeleteCycleByUserIdAndCycleIdMutation
} = cyclesApiSlice
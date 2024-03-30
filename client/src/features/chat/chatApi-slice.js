import { apiSlice } from '../../app/api/api-slice'

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getChatData: builder.query({
      query: params => ({
        url: `/chat/${params.clientid}/${params.coachid}`,
        method: 'GET',
      }),
      providesTags: ['Chat'],
    }),
    sendMessage: builder.mutation({
      query: params => ({
        url: `/chat/${params.chatid}`,
        method: 'POST',
        body: params.message
      }),
      invalidatesTags: ['Chat']
    })
    
  })
})
// query or mutation based on get / something else
export const {
  useGetChatDataQuery,
  useSendMessageMutation
} = chatApiSlice
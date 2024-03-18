import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logout } from '../../features/auth/auth-slice'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token
    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
    }
    return headers
  }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.originalStatus === 403) {
    //console.log('sending refresh token')
    // send refresh token to get new access token
    const refreshResult = await baseQuery('/refresh', api, extraOptions)
    //console.log(refreshResult)
    if (refreshResult?.data) {
      const user = api.getState().auth.user
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }))
      // retry the original query with the new access token
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logout())
    }
  }
  return result
}

export const apiSlice = createApi({
  baseQuery: baseQuery,
  endpoints: builder => ({})
})
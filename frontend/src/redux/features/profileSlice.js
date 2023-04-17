import { apiSlice } from '../api/apiSlice'
import { updateUserProfile } from './userSlice'

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    userLastMessages: builder.query({
      query: () => `/chat/user-messages/`,
    }),
    editProfile: builder.mutation({
        query: profileObj => ({
            url: '/auth/edit-profile/',
            method: 'PATCH',
            body: profileObj
        }),
        async onQueryStarted( profileObj, { dispatch, queryFulfilled }) {
            try {
              const { data: profile } = await queryFulfilled
              dispatch(updateUserProfile(profile))
            } catch (err) {
              console.error('Failed to add item', err)
            }
        }
    }),
    updateUserPassword: builder.mutation({
      query: (newInfo) => ({
        url: '/auth/update-password/',
        method: 'PATCH',
        body: newInfo
      }),
    }),
  })
})

export const { 
  useUserLastMessagesQuery,
  useEditProfileMutation,
  useUpdateUserPasswordMutation } 
  = extendedApiSlice
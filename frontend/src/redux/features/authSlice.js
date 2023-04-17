import { publicApiSlice } from '../api/publicApiSlice'

export const extendedApiSlice = publicApiSlice.injectEndpoints({
  endpoints: builder => ({
    resetPassword: builder.mutation({
        query: emailObj => ({
            url: '/auth/request-reset-email/',
            method: 'POST',
            body: emailObj
        }),
    }),
    setNewPassword: builder.mutation({
        query: passwordObj => ({
            url: '/auth/password-reset-complete/',
            method: 'PATCH',
            body: passwordObj
        }),
    }),
  })
})

export const { useResetPasswordMutation, useSetNewPasswordMutation } = extendedApiSlice

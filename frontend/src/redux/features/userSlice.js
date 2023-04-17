import { createSlice } from '@reduxjs/toolkit';
import { login, register } from '../actions/auth';
import dayjs from 'dayjs';
import jwt_decode from "jwt-decode";


let isAuthenticated = false;
let userObj = null;

if (localStorage.getItem('userInfo')) {
	let userInfo = JSON.parse(localStorage.getItem('userInfo'))
	let decodedRefresh = userInfo.token?.refresh ? jwt_decode(userInfo.token.refresh) : null
	if (decodedRefresh && dayjs.unix(decodedRefresh.exp) > 1) {
		userObj = userInfo
		isAuthenticated = true
	}
}

const initialState = {
	isAuthenticated,
	user: userObj,
	loading: false,
	error: null,
	isSaved: true,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: state => {
			state.isAuthenticated = false;
			state.user = null
			localStorage.removeItem('userInfo')
		},
		tokenReceived: (state,action) => {
			let refreshedUser = {...state.user, token:action.payload}
            localStorage.setItem('userInfo', JSON.stringify(refreshedUser))
			return {...state, user:refreshedUser}
		},
		saveMe: (state, action) => {
			state.isSaved = action.payload;
		},
		updateUserProfile: (state, action) => {
			let profile = action.payload
			state.user.name = `${profile.first_name} ${profile.last_name}`
			state.user.profile = profile
			localStorage.setItem('userInfo', JSON.stringify(state.user))
		},
	},
	extraReducers: builder => {
		builder
			.addCase(register.pending, state => {
				state.loading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.loading = false;
				state.isAuthenticated = true;
				state.user = action.payload
				state.error = null
				if (state.isSaved) {
					localStorage.setItem('userInfo', JSON.stringify(action.payload))
				}
			})
			.addCase(register.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload
			})
			.addCase(login.pending, state => {
				state.loading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loading = false;
				state.isAuthenticated = true;
				state.user = action.payload
				state.error = null
				if (state.isSaved) {
					localStorage.setItem('userInfo', JSON.stringify(action.payload))
				}
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload
			})
	},
});

export const { 
	logout,
	tokenReceived, 
	saveMe, 
	updateUserProfile,
 } = userSlice.actions;
export default userSlice.reducer;

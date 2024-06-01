import { createSlice } from "@reduxjs/toolkit";


const getUserFromStorage = () => {
  return JSON.parse(localStorage.getItem('user')) || null;
}

const getTokenFromStorage = () => {
  return localStorage.getItem('token') || null;
}

const initialState = {
  user: getUserFromStorage(),
  token: getTokenFromStorage()
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    loginUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('user')
      localStorage.removeItem('jwt')
      localStorage.removeItem('token')
      state.token = null;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload))
    }
  }
})
export const { loginUser, logoutUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
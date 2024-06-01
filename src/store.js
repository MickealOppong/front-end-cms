import { configureStore } from "@reduxjs/toolkit";
import selectSliceReducer from './features/data/selectSlice';
import sidebarReducer from './features/sidebar/sidebarSlice';
import userReducer from './features/user/userSlice';
export const store = configureStore({
  reducer: {
    userState: userReducer,
    sidebarState: sidebarReducer,
    selectState: selectSliceReducer,

  }
})
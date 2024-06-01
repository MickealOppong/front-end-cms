import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  showSidebar: true
}
const sidebarSlice = createSlice({
  name: ' sidebar',
  initialState,
  reducers: {
    toggle: (state) => {
      state.showSidebar = !state.showSidebar;
    }
  }
})
export const { toggle, isSmallScreen } = sidebarSlice.actions;
export default sidebarSlice.reducer;
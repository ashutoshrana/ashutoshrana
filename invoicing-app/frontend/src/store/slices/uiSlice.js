import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: true,
  notification: {
    open: false,
    message: '',
    severity: 'info',
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    showNotification: (state, action) => {
      state.notification = {
        open: true,
        message: action.payload.message,
        severity: action.payload.severity || 'info',
      };
    },
    closeNotification: (state) => {
      state.notification.open = false;
    },
  },
});

export const { toggleSidebar, showNotification, closeNotification } = uiSlice.actions;
export default uiSlice.reducer;

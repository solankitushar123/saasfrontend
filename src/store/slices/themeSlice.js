import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: { isDark: true },
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
      document.documentElement.classList.toggle('dark', state.isDark);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;

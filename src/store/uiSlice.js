import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: { theme: 'dark', sidebarOpen: false, loading: false },
  reducers: {
    toggleTheme: (state) => { state.theme = state.theme === 'dark' ? 'light' : 'dark' },
    toggleSidebar: (state) => { state.sidebarOpen = !state.sidebarOpen },
    setLoading: (state, action) => { state.loading = action.payload },
  },
})

export const { toggleTheme, toggleSidebar, setLoading } = uiSlice.actions
export default uiSlice.reducer

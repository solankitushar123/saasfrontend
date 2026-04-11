import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/api/auth/login', credentials)
    localStorage.setItem('token', data.token)
    return data
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Login failed')
  }
})

export const getMe = createAsyncThunk('auth/getMe', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token')
    const { data } = await axios.get('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
    return data
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to get user')
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: localStorage.getItem('token'), loading: false, error: null },
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      localStorage.removeItem('token')
    },
    clearError: (state) => { state.error = null },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.loading = true; state.error = null })
      .addCase(login.fulfilled, (state, action) => { state.loading = false; state.user = action.payload.user; state.token = action.payload.token })
      .addCase(login.rejected, (state, action) => { state.loading = false; state.error = action.payload })
      .addCase(getMe.fulfilled, (state, action) => { state.user = action.payload.user })
      .addCase(getMe.rejected, (state) => { state.user = null; state.token = null; localStorage.removeItem('token') })
  },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer

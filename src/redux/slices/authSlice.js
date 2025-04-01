import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    account: {
        token: '',
        username: '',
        email: '',
        is_staff: false,
    },
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        doLogin: (state, action) => {
            console.log(action.payload);
            state.account = { ...action.payload }; // Gán toàn bộ dữ liệu vào account
            state.isAuthenticated = true;
        },
        doLogout: (state) => {
            console.log('Đăng xuất');
            state.account = { token: '', username: '', email: '', is_staff: false }; // Reset account
            state.isAuthenticated = false;
        },
    },
});

export const { doLogin, doLogout } = authSlice.actions;
export default authSlice.reducer;

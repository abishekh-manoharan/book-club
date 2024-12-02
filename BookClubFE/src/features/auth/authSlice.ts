import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState: [],
    reducers: {
        login(state, action: PayloadAction<string>) {
            console.log(state, action)
        }
    },
    // extraReducers(builder) {

    // }
});

export const { login: loginAction } = authSlice.actions;

export default authSlice.reducer;
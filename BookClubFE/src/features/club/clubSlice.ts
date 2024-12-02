import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const clubSlice = createSlice({
    name: 'club',
    initialState: [],
    reducers: {
        login(state, action: PayloadAction<string>) {
            console.log(state, action)
        }
    },
    // extraReducers(builder) {

    // }
});

export const { login: loginAction } = clubSlice.actions;

export default clubSlice.reducer;
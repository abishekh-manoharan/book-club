import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const discussionSlice = createSlice({
    name: 'discussion',
    initialState: [],
    reducers: {
        login(state, action: PayloadAction<string>) {
            console.log(state, action)
        }
    },
    // extraReducers(builder) {

    // }
});

export const { login: loginAction } = discussionSlice.actions;

export default discussionSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const meetingSlice = createSlice({
    name: 'meeting',
    initialState: [],
    reducers: {
        login(state, action: PayloadAction<string>) {
            console.log(state, action)
        }
    },
    // extraReducers(builder) {

    // }
});

export const { login: loginAction } = meetingSlice.actions;

export default meetingSlice.reducer;
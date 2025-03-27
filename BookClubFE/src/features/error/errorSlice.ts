import { AppThunk, RootState } from "../../app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const errorInitialState = {
    errorMsg: "",
    error: false
}



const errorSlice = createSlice({
    name: 'error',
    initialState: errorInitialState,
    reducers: {
        updateErrorMessage(state, action: PayloadAction<string>) {
            state.errorMsg = action.payload;
            state.error = true;
        }, 
        clearErrorMessage(state) {
            state.error = false;
        }
    },
});

export const { updateErrorMessage: updateErrorMessageAction, clearErrorMessage } = errorSlice.actions;

export const updateErrorMessageThunk = (msg: string): AppThunk => (dispatch) => {
	dispatch(updateErrorMessageAction(msg));

    setTimeout(() => {
        dispatch(clearErrorMessage());
    }, 1000)
}

export const selectError = ( state: RootState ) => state.error;

export default errorSlice.reducer;
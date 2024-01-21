import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    service: undefined,
};

const selectedServiceSlice = createSlice({
    name: 'selectedService',
    initialState: initialState,
    reducers: {
        updateService(state, action) {
            state.service = action.payload
        }
    }
})

export const {updateService} = selectedServiceSlice.actions;

export default selectedServiceSlice.reducer;
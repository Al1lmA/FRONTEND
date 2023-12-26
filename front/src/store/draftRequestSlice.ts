import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	request: undefined
};


const draftRequestSlice = createSlice({
	name: 'draftRequest',
	initialState: initialState,
	reducers: {
		updateRequest(state, action) {
			state.request = action.payload
		}
	}
})

export const {updateRequest} = draftRequestSlice.actions;

export default draftRequestSlice.reducer;
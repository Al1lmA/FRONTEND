import {configureStore} from "@reduxjs/toolkit";

import authReducer from "./authSlice"
import draftRequestReducer from "./draftRequestSlice";
import serviceReducer from "./selectedServiceSlice"

export default configureStore({
  reducer: {
    user: authReducer,
    draftRequest: draftRequestReducer,
    selectedService: serviceReducer
  }
});
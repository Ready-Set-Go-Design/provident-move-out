import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./formSlice";
import addressReducer from "./addressSlice";
import submissionReducer from "./submissionSlice";

export const store = configureStore({
  reducer: {
    form: formReducer,
    address: addressReducer,
    submission: submissionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

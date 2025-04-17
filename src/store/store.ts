import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./formSlice";
import addressReducer from "./addressSlice";

export const store = configureStore({
  reducer: {
    form: formReducer,
    address: addressReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

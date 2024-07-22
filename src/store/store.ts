import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import analysisReducer from "./features/analysis/analysisSlice";
// store variable is a global variable.
export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      analysis: analysisReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

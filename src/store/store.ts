import { configureStore } from "@reduxjs/toolkit";
import todo from "./counterSlice";

export const store = configureStore({
  reducer: {
    todo,
  },
});

export type RootState = ReturnType<typeof store.getState>;
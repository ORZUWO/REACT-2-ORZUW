import { configureStore } from '@reduxjs/toolkit'
import  Todoslice  from './counterSlice'

export const store = configureStore({
  reducer: {
    todo:Todoslice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch



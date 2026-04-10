import { configureStore } from '@reduxjs/toolkit'
import  Todoslice  from './counterSlice'

export const store = configureStore({
  reducer: {
    todo:Todoslice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
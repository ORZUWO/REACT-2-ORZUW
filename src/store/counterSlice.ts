import { createSlice } from '@reduxjs/toolkit'
export interface Idata {
    id: number,
    status: boolean,
    name: string,
    age: number
}

export interface CounterState {
    value: number,
    data: Idata[]
}

const initialState: CounterState = {
    value: 0,
    data: []
}

export const Todoslice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
      
    },
})

export const { } = Todoslice.actions

export default Todoslice.reducer
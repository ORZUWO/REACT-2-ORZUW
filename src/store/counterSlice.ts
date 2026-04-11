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
    data: [{ id: 1, name: "Ali", age: 20, status: true },
    { id: 2, name: "Vali", age: 22, status: false },
    { id: 3, name: "Said", age: 19, status: true },
    { id: 4, name: "Jamshed", age: 25, status: false },
    { id: 5, name: "Farhod", age: 21, status: true },
    { id: 6, name: "Rustam", age: 23, status: false },
    { id: 7, name: "Dilshod", age: 24, status: true },
    ]

}

export const Todoslice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
      
    },
})

// Action creators are generated for each case reducer function
export const { } = Todoslice.actions

export default Todoslice.reducer
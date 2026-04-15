import { createSlice } from '@reduxjs/toolkit'
import axios from "axios"
import { loadable } from "jotai/utils"
import {atom} from "jotai"


export const url="http://37.27.29.18:8001/api/to-dos"
export const img="http://37.27.29.18:8001/images"
export interface IImage {
  id: number
  imageName: string
}

export interface Idata {
  id: number
  isCompleted: boolean
  name: string
  description: string
  images: IImage[]
}
export const cntatom=atom(0)

export const getdata=atom(async (get,set)=>{
    get(cntatom)
    try {
        let {data}=await axios.get(url)
        return data.data
    } catch (error) {
        console.error(error);
    }  
})

export const deleteuser=atom( null,async (get,set,id)=>{
   try {
    await axios.delete(`${url}?id=${id}`)
    set(cntatom, get(cntatom) + 1)
   } catch (error) {
    console.error(error);
   }
})


export const dataatom = loadable(getdata)






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
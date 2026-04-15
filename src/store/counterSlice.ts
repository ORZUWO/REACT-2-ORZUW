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
    data: Idata[],
    error:boolean,
    isloading:boolean
}



const initialState: CounterState = {
    value: 0,
    data:[],
    error:false,
    isloading:true,
}

export const Todoslice = createSlice({
    name: 'todo',
    initialState,
    reducers: {



    },
    extraReducers:(bulder)=>{
   bulder.addCase(getdata.pending,(state,action)=>{
    state.isloading=true
    state.error=false
   })
   bulder.addCase(getdata.fulfilled,(state,action)=>{
    state.data=action.payload
    state.isloading=false
    state.error=false
   })
   bulder.addCase(getdata.rejected,(state,action)=>{
    state.isloading=false
    state.error=true
   })
    }
   
      
})

// Action creators are generated for each case reducer function
export const {} = Todoslice.actions

export const { adduser, deleteuser, chek, edituser } = counterSlice.actions;
export default counterSlice.reducer;
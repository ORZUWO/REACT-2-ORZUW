import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"

const chh="http://37.27.29.18:8001/completed"
const url="http://37.27.29.18:8001/api/to-dos"
 export const img="http://37.27.29.18:8001/images"
export interface Ima {
  id: number
  imageName: string
}

export interface Idata {
  id: number
  name: string
  description: string
  isCompleted: boolean
  images: Ima[]
}


export interface CounterState {
    value: number,
    data: Idata[],
    error:boolean,
    isloading:boolean
}



export const getdata=createAsyncThunk("todo/getdata",async ()=>{
     try {
        let {data}=await axios.get(url)
        return data.data
     } catch (error) {
        console.error(error);
     }
})

export const deleteuser=createAsyncThunk("todo/deleteuser",async(id,{dispatch})=>{
    try {
        await axios.delete(`${url}?id=${id}`)
        dispatch(getdata())
    } catch (error) {
        console.error(error);
    }
})

export const adduser=createAsyncThunk("todo/adduser",async(values,{dispatch})=>{
    try {
        await axios.post(url,values)
        dispatch(getdata())
    } catch (error) {
        console.error(error);
    }
})

export const edituser = createAsyncThunk(
  "todo/edituser",
  async (
    values: { id: number; name: string; description: string },
    { dispatch }
  ) => {
    try {
      await axios.put(url, values)
      dispatch(getdata())
    } catch (error) {
      console.error(error)
    }
  }
)

export const che = createAsyncThunk(
  "todo/che",
  async (e: Idata, { dispatch }) => {
    try {
      await axios.put(`${chh}?id=${e.id}`, {
        ...e,
        isCompleted: !e.isCompleted,
      })
      dispatch(getdata())
    } catch (error) {
      console.error(error)
    }
  }
)


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
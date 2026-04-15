import { createSlice } from '@reduxjs/toolkit'
import { atom } from "jotai"
import axios from "axios"
import { loadable } from "jotai/utils"

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

export interface CounterState {
  value: number
  data: Idata[]
}

export const url = "http://37.27.29.18:8001/api/to-dos"
export const img = "http://37.27.29.18:8001/images"

const cnt = atom(0)

export const getdata = atom(async (get) => {
  get(cnt)
  try {
    const { data } = await axios.get(url)
    return data.data as Idata[]
  } catch (error) {
    console.error(error)
    return []
  }
})

export const datauser = loadable(getdata)

const initialState: CounterState = {
  value: 0,
  data: []
}

export const Todoslice = createSlice({
  name: 'todo',
  initialState,
  reducers: {}
})

export const {} = Todoslice.actions
export default Todoslice.reducer
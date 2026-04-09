import {create} from "zustand"

export interface IUser {
  id: number,
  name: string,
  age: number,
  status: boolean
}

export const usecrad = create((set,get)=>({
    data: [
  { id: 1, name: "Ali", age: 20, status: true },
  { id: 2, name: "Vali", age: 25, status: false },
  { id: 3, name: "Said", age: 18, status: true },
  { id: 4, name: "Jamshed", age: 30, status: false },
  { id: 5, name: "Farhod", age: 22, status: true },
  { id: 6, name: "Aziz", age: 27, status: false },
  { id: 7, name: "Rustam", age: 24, status: true },
],


adduser:(user:IUser)=>set((e:any)=>({
    data:[...e.data,{...user}]
  })),
edituser:(userEdit:IUser)=>set((e:any)=>({
  data: e.data.map((user: any) => user.id == userEdit.id ? userEdit : user )
})),
deleteuser:(userid:IUser)=>set((e:any)=>({
  data:e.data.filter((el:any)=>el.id!=userid)
})),





}))
import { createSlice } from "@reduxjs/toolkit";

export interface IUser {
  id: number;
  name: string;
  age: number;
  status: boolean;
}

interface IState {
  data: IUser[];
}

const initialState: IState = {
  data: [
    { id: 1, name: "Ali", age: 20, status: true },
    { id: 2, name: "Vali", age: 23, status: false },
    { id: 3, name: "Said", age: 19, status: true },
  ],
};

const counterSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    adduser: (state, action) => {
      state.data.push(action.payload);
    },
    deleteuser: (state, action) => {
      state.data = state.data.filter((e) => e.id !== action.payload);
    },
    chek: (state, action) => {
      const user = state.data.find((e) => e.id === action.payload);
      if (user) {
        user.status = !user.status;
      }
    },
    edituser: (state, action) => {
      state.data = state.data.map((e) =>
        e.id == action.payload.id ? action.payload : e
      );
    },
  },
});

export const { adduser, deleteuser, chek, edituser } = counterSlice.actions;
export default counterSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const initialState = {
  tasks: [],
  singleTask: {},
};

const taskSclice = createSlice({
  name: "taskslice",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload.task;
    },
    setSingleTask: (state, action) => {
      state.singleTask = action.payload;
    },
  },
});

export const { setTasks, setSingleTask } = taskSclice.actions;
export default taskSclice.reducer;

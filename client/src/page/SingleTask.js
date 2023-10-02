import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSingleTask } from "../redux/taskSlice";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./Header";
import TaskForm from "../componets/TaskForm";
import { set } from "mongoose";

const SingleTask = () => {
  const { id } = useParams();
  console.log(id);

  const [currTask, setcurrTask] = useState(null);
  const dispatch = useDispatch();
  const { singleTask } = useSelector((state) => state.task);

  const getSingleTask = async () => {
    const { data } = await axios.get(`/tasks/` + id);
    if (data.success) {
      console.log(data);
      setcurrTask(data);
      dispatch(setSingleTask(data.fetchTask));
    }
  };

  useEffect(() => {
    getSingleTask();
  }, []);

  return (
    <Box>
      <Header />
      {console.log(currTask)}
      <TaskForm singleTask={singleTask} />
    </Box>
  );
};

export default SingleTask;

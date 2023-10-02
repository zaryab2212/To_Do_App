import { Box, Container } from "@mui/material";
import React from "react";
import TaskForm from "../componets/TaskForm";

const CreateTask = () => {
  return (
    <Container>
      <Box>
        <TaskForm mode="create" />
      </Box>
    </Container>
  );
};

export default CreateTask;

import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const TaskForm = ({ mode = "edit", singleTask }) => {
  const editSchema = Yup.object().shape({
    name: Yup.string().required("name feild is required"),
    type: Yup.string().required("type feild is required"),
    date: Yup.string().required("date feild is required"),
    time: Yup.string().required("time feild is required"),
    status: Yup.string().required("status feild is required"),
  });
  const createSchema = Yup.object().shape({
    name: Yup.string().required("name feild is required"),
    type: Yup.string().required("type feild is required"),
    date: Yup.string().required("date feild is required"),
    time: Yup.string().required("time feild is required"),
  });

  const initailVal = {
    name: "",
    type: "",
    date: dayjs().format("YYYY-MM-DD"),
    time: dayjs(),
  };
  const isNOtMobile = useMediaQuery("(min-widht: 768px)");
  const [date, setdate] = useState();
  const [time, settime] = useState();
  const type = ["default", "personal", "shopping", "whishlist", "work"];
  const navigate = useNavigate();
  const params = useParams();

  const handleOnsubmit = async (values, onSubmitProps) => {
    console.log(values);
    if (mode === "edit") {
      const { data } = await axios.put("/tasks/update/" + params.id, values);
      if (data.success) {
        console.log(data);

        navigate("/");
      }
    } else {
      values.time = values.time.format("HH:MM");
      const { data } = await axios.post(`/tasks/create`, values);
      if (data.success) {
        console.log(data);

        navigate("/");
      }
    }
  };

  return (
    <>
      {console.log(singleTask)}
      <Formik
        onSubmit={handleOnsubmit}
        initialValues={mode === "create" ? initailVal : singleTask}
        validationSchema={mode === "create" ? createSchema : editSchema}
      >
        {({
          handleBlur,
          handleSubmit,
          values,
          touched,
          handleChange,
          resetForm,
          errors,
        }) => (
          <Box p="2rem 0" m="2rem auto" width={isNOtMobile ? "90%" : "50%"}>
            <Typography textAlign="center" mb="2rem">
              {mode === "create" ? "Create a task" : "Edit a Task"}
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box display="flex" flexDirection="column" gap="30px">
                <TextField
                  label="Task name"
                  value={values?.name}
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.name) && Boolean(errors.name)}
                ></TextField>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="date"
                    value={mode === "edit" ? dayjs(values.date) : values.date}
                    minDate={mode === "create" ? dayjs() : null}
                    onChange={(newVal) => {
                      values.date = newVal.format("YYYY-MM-DD");
                      setdate(values.date);
                    }}
                    onBlur={handleBlur}
                    name="date"
                    renderInput={(params) => {
                      <TextField
                        {...params}
                        helperText="select Date"
                      ></TextField>;
                    }}
                    errors={Boolean(touched.date) && Boolean(errors.date)}
                  >
                    {" "}
                  </DatePicker>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="time"
                    value={
                      mode === "edit"
                        ? dayjs(
                            `${values.date.split("T")}T${values.time}}` || null
                          )
                        : values?.date
                    }
                    onChange={(newVal) => {
                      values.time = newVal;
                      settime(values?.time);
                    }}
                    onBlur={handleBlur}
                    name="date"
                    renderInput={(params) => {
                      <TextField
                        {...params}
                        helperText="select Time"
                      ></TextField>;
                    }}
                    errors={Boolean(touched.time) && Boolean(errors.time)}
                  >
                    {" "}
                  </TimePicker>
                </LocalizationProvider>
                <FormControl>
                  <InputLabel>Select Type</InputLabel>
                  <Select
                    label="Select Type"
                    value={values?.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="type"
                    errors={Boolean(touched.type) && Boolean(errors.type)}
                  >
                    {type?.map((e, i) => (
                      <MenuItem value={e} key={i}>
                        {e}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {mode === "edit" && (
                  <FormControl>
                    <InputLabel>status</InputLabel>
                    <Select
                      name="status"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.status}
                      label="status"
                    >
                      <MenuItem value="pending">pending</MenuItem>
                      <MenuItem value="compeleted">Compeleted</MenuItem>
                    </Select>
                  </FormControl>
                )}
                <Button
                  type="submit"
                  variant="outlined"
                  m="2rem 0"
                  p="1rem 0"
                  backgroundColor="#00d5FA"
                >
                  {mode === "edit" ? "Edit" : "Create"}
                </Button>
              </Box>
            </form>
          </Box>
        )}
      </Formik>
    </>
  );
};

export default TaskForm;

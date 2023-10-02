import React from "react";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import axios from "../services/api";
import axios from "axios";
import {
  Box,
  TextField,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Dropzone from "react-dropzone";
import { setLogin } from "../redux/userSlice";

const initialRegisterVal = {
  name: "",
  email: "",
  password: "",
  picture: "",
};
const initialLoginVal = {
  email: "",
  password: "",
};

const registerSchema = Yup.object().shape({
  name: Yup.string().required("name is required"),
  email: Yup.string()
    .email("not a vaild email formate")
    .required("name is required"),
  password: Yup.string().required("password is required"),
});
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("not a vaild email formate")
    .required("name is required"),
  password: Yup.string().required("password is required"),
});
const Login = () => {
  const isNOtMobile = useMediaQuery("(min-width:760px)");
  const [Page, setPage] = useState("login");
  const isLogin = Page === "login";
  const isRegister = Page === "register";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (values, onSubmitProps) => {
    const { data } = await axios.post("/auth/login", values);
    if (data.success) {
      onSubmitProps.resetForm();
      dispatch(setLogin(data.user));
      navigate("/");
    }
  };

  const handleRegister = async (values, onSubmitProps) => {
    console.log(values);
    let formData = new FormData();
    for (const property of Object.keys(values)) {
      formData.append(property, values[property]);
    }
    console.log(formData);
    const { data } = await axios.post("/auth/register", formData);
    console.log(data);
    if (data.success) {
      onSubmitProps.resetForm();
      setPage("login");
    }
  };

  const handleForm = (values, onSubmitProps) => {
    console.log("working");
    // console.log(values);
    if (isLogin) {
      handleLogin(values, onSubmitProps);
    }
    if (isRegister) {
      handleRegister(values, onSubmitProps);
    }
  };

  return (
    <>
      {console.log(Page)}
      <div>this is workidn</div>
      <Formik
        onSubmit={handleForm}
        initialValues={isLogin ? initialLoginVal : initialRegisterVal}
        validationSchema={isLogin ? loginSchema : registerSchema}
      >
        {({
          handleBlur,
          touched,
          setFieldValue,
          values,
          handleChange,
          errors,
          handleSubmit,
        }) => (
          <Box p="2rem 0" m="2rem auto" width={isNOtMobile ? "50%" : "90%"}>
            <Typography textAlign="center" mb="2rem">
              Wellcome to todo app
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box display="flex" flexDirection="column" gap="30px">
                {isRegister && (
                  <>
                    <TextField
                      label="Enter your name"
                      value={values.name}
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.name) && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    ></TextField>
                    <Dropzone
                      multiple={false}
                      acceptedFiles=".jpg , .png"
                      onDrop={(acceptedFiles) => {
                        setFieldValue("picture", acceptedFiles[0]);
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          p="1rem"
                          border="2px solid #000"
                          textAlign="center"
                          sx={{
                            "&:hover": {
                              cursor: "pointer",
                            },
                          }}
                        >
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <Typography> Add Picture</Typography>
                          ) : (
                            <Typography>
                              {values.picture.name} <EditOutlinedIcon />
                            </Typography>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </>
                )}
                <TextField
                  label="Enter your email"
                  value={values.email}
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                ></TextField>
                <TextField
                  label="Enter your password"
                  value={values.password}
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                ></TextField>
                <Button type="submit" m="1rem 0" background="#00d5fa">
                  {isLogin ? "Login" : "Re[[[gister"}{" "}
                </Button>
                <Typography
                  onClick={() => {
                    setPage(isLogin ? "register" : "login");
                  }}
                  variant="h6"
                  textAlign="center"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  {isLogin
                    ? "Do not have an Account ? | Register"
                    : "Already have an Account? | Login"}
                </Typography>
              </Box>
            </form>
          </Box>
        )}
      </Formik>
    </>
  );
};

export default Login;

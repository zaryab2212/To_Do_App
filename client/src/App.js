// import "./App.css";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Login from "./page/Login";
import Resister from "./page/Resister";

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import SingleTask from "./page/SingleTask";
import CreateTask from "./page/CreateTask";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user);
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    user
      ? {
          path: "/",
          element: <Home />,
        }
      : {
          path: "/login",
          element: <Login />,
        },
    {
      path: "/tasks/:id",
      element: <SingleTask />,
    },
    {
      path: "/tasks/create",
      element: <CreateTask />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

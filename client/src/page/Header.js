import React from "react";
import { Box, Select, MenuItem, InputLabel } from "@mui/material";
import { setLogout } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const Header = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    if (user) {
      dispatch(setLogout());
      navigate("/login");
    }
  };
  return (
    // <Box
    //   height="50px"
    //   backgroundColor="#036fc"
    //   p="0 20px"
    //   display="flex"
    //   alignItems="center"
    //   justifyContent="space-between"
    // >
    //   <Box fontSize="20px" color="#fff" fontWeight="bold">
    //     <Link to="/" style={{ textDecoration: "none" }}>
    //       {" "}
    //       To-Do App
    //     </Link>
    //   </Box>
    //   Header
    // </Box>

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Todo APP
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <div className=" mx-2">
            hello! <b> {user?.name} </b>
            <img
              style={{
                border: "2px solid",
                borderRadius: "50%",
                objectFit: "cover",
              }}
              src={`http://localhost:3000/assets/${user.picturePath}`}
              alt={user.name}
              height="50px"
              width="50px"
            />
          </div>

          <div>
            <button className="btn btn-danger mx-4" onClick={handleLogOut}>
              {" "}
              Log Out
            </button>
          </div>
          {/* {user && console.log(user)} */}
        </div>
      </div>
    </nav>
  );
};

export default Header;

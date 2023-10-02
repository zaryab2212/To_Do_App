import React from "react";
import { useDispatch } from "react-redux";
import { setSingleTask } from "../redux/taskSlice";
import { Link } from "react-router-dom";

const Card = ({ date, name, status, time, type, _id }) => {
  const dispatch = useDispatch();
  // const newType = type.split(" ");
  // console.log(newType);
  return (
    <>
      <div className="card " style={{ width: "18rem" }}>
        <div className="card-body col-sm">
          <h5 className="card-title">{name.split(" ")}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Time: {time}</h6>
          <h6 className="card-subtitle mb-2 text-muted">Status: {status}</h6>
          <h6 className="card-subtitle mb-2 text-muted">
            Date: {date.split("T")[0]}
          </h6>
          <p className="card-text">Type: {type}</p>
          <Link to={`tasks/${_id}`}>
            <button className="btn btn-primary">Edit</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Card;

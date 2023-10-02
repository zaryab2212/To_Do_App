import React, { useEffect, useState } from "react";
import Header from "./Header";
import Card from "../componets/Card";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import taskSlice, { setTasks } from "../redux/taskSlice";
import { Link } from "react-router-dom";
// import { Box, Card } from "@mui/material";

const Home = () => {
  const [taskType, settaskType] = useState("");
  const [dayFilter, setdayFilter] = useState("");
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.task);
  const type = ["default", "personal", "shopping", "whishlist", "work"];

  const cardData = async () => {
    if (taskType && dayFilter) {
      var { data } = await axios.get(
        `/tasks?type=${taskType}&day=${dayFilter}`
      );
    } else if (taskType) {
      var { data } = await axios.get(`/tasks?type=${taskType}`);
    } else if (dayFilter) {
      var { data } = await axios.get(`/tasks?day=${dayFilter}`);
      console.log(data);
    } else {
      var { data } = await axios.get(`/tasks`);
    }
    // console.log(data);
    if (data.success) {
      dispatch(setTasks(data));
    }
  };

  const handleSelect = (e) => {
    settaskType(e.target.value);
  };
  const handleClearFilter = () => {
    setdayFilter("");
    settaskType("");
  };

  useEffect(() => {
    cardData();
  }, [taskType, dayFilter]);

  return (
    <>
      <div className="container">
        {" "}
        <Header></Header>
        <div className="d-flex justify-content-between m-3">
          <div className="d-flex  ">
            <select
              onChange={(e) => handleSelect(e)}
              className="form-select w-1"
            >
              {type.map((e) => (
                <>
                  <option value={e}>{e}</option>
                </>
              ))}
            </select>
            <div className="">
              <button
                onClick={handleClearFilter}
                className="mx-3 w-100 btn btn-danger"
              >
                Clear Filters
              </button>
            </div>
          </div>
          <div className="gap-2 align-center">
            <button
              onClick={() => setdayFilter("today")}
              className="btn btn-primary m-2 align-center"
            >
              Today
            </button>
            <button
              onClick={() => setdayFilter("seven")}
              className="btn btn-primary m-2"
            >
              This Week
            </button>
            <button
              onClick={() => setdayFilter("thirty")}
              className="btn btn-primary m-2"
            >
              This Month
            </button>
          </div>
        </div>
        <div className="w-100 mb-2">
          <Link to="tasks/create">
            {" "}
            <button className="w-100 m-2 mb-2 btn btn-success">
              Create Task
            </button>
          </Link>
        </div>
        <div className="d-flex flex-wrap gap-5">
          {tasks.length && tasks.length > 0 ? (
            tasks?.map((e) => (
              <Card
                date={e.date}
                name={e.name}
                status={e.status}
                time={e.time}
                type={e.type}
                _id={e._id}
              ></Card>
            ))
          ) : (
            <h4>no tasks</h4>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

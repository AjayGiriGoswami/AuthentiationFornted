import React, { useContext, useEffect, useState } from "react";
import Header from "./Components/Dashboard/Header";
import Login from "./Components/User/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import Register from "./Components/User/Register";
import Dashboard from "./Components/Dashboard/Dashboard";
import Error from "./Components/Dashboard/Error";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { LoginContext } from "./Components/Context/Context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Forgot from "./Components/User/Forgot";
import Restpassword from "./Components/User/Restpassword";

const App = () => {
  const [show, setshow] = useState(false);

  const {  setLoginData } = useContext(LoginContext);

  const navigate = useNavigate();
  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");
    // console.log(token);

    const data = await fetch("http://localhost:3500/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const res = await data.json();
    // console.log(res);
    if (res.status === 201) {
      // console.log("User Verfity");
      setLoginData(res);
      navigate("/Dashboard");
    } else if (res.status === 401 || !res) {
      console.log("user is not vaild");
      // navigate("*");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      setshow(true);
    }, 2000);
  });

  return (
    <div>
      
      {show ? (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/restpassword/:id/:token" element={<Restpassword />} />
            <Route path="*" element={<Error />} />
          </Routes>
          <ToastContainer />
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      )}
    </div>
  );
};

export default App;

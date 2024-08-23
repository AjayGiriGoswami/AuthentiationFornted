import React, { useContext, useEffect, useState } from "react";
import man from "./man.png";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../Context/Context";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Dashboard = () => {
  const [show, setshow] = useState(false);

  const { logindata, setLoginData } = useContext(LoginContext);
  // console.log(logindata.validuserone.email);

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
      console.log("error");
      navigate("*");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      setshow(true)
    }, 2000);
  });

  return (
    <>
      {show ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={man}
              style={{ width: "200px", marginTop: 20 }}
              alt="Name"
            />
            <h1>
              User Email:
              {logindata ? logindata.validuserone.email : ""}
            </h1>
          </div>
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
    </>
  );
};

export default Dashboard;

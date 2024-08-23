import React, { useContext } from "react";
import "./Header.css";
import Avatar from "@mui/material/Avatar";
import { LoginContext } from "../Context/Context";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const { logindata, setLoginData } = useContext(LoginContext);
  // console.log(logindata.validuserone.fname[0]);

  const navigate = useNavigate("");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const userLogout = async () => {
    let token = localStorage.getItem("usersdatatoken");
    // console.log(token);

    const data = await fetch("http://localhost:3500/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const res = await data.json();
    // console.log(res);
    if (res.status === 201) {
      toast.success("User Logout Sucessfully", {
        position: "top-center",
      });
      setLoginData(false);
      localStorage.removeItem("usersdatatoken");
      window.location.reload();
    } else {
      console.log("error");
    }
  };

  // const goError = () => {
  //   navigate("*");
  // };

  const goDashboard = () => {
    navigate("/Dashboard");
  };

  const Home = () => {
    navigate("/");
  };

  const goregister = () => {
    navigate("/register");
  };

  return (
    <header>
      <nav>
        <h1 onClick={Home} style={{ cursor: "pointer" }}>
          Goswami
        </h1>

        <div className="avtar">
          {logindata.validuserone ? (
            <Avatar
              style={{
                background: "salmon",
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
              onClick={handleClick}
            >
              {logindata ? logindata.validuserone.fname[0] : ""}
            </Avatar>
          ) : (
            <Avatar
              style={{ background: "blue" }}
              onClick={handleClick}
            ></Avatar>
          )}
        </div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {logindata.validuserone ? (
            <>
              <MenuItem
                onClick={() => {
                  goDashboard();
                  handleClose();
                }}
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  userLogout();
                  handleClose();
                }}
              >
                Logout
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem
                onClick={() => {
                  Home();
                  handleClose();
                }}
              >
                Login
              </MenuItem>
              <MenuItem
                onClick={() => {
                  goregister();
                  handleClose();
                }}
              >
                Register
              </MenuItem>
            </>
          )}
        </Menu>
      </nav>
    </header>
  );
};

export default Header;

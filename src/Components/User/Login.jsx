import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Mix.css";
import { toast } from "react-toastify";

const Login = () => {
  const [passShow, setpassShow] = useState(false);
  const navigate = useNavigate();

  const [inpval, setInpval] = useState({
    email: "",
    password: "",
  });

  const setVal = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;

    setInpval(() => {
      return { ...inpval, [name]: value };
    });
  };

  const loginuser = async (e) => {
    e.preventDefault();

    const email = inpval.email;
    const password = inpval.password;

    if (email === "") {
      toast.error("Please enter your email");
    } else if (!email.includes("@") || !email.includes(".com")) {
      toast.warn("Please Vaild Email");
    } else if (password === "") {
      toast.error("Please enter your password");
    } else if (password.length < 6) {
      toast.warn("Plase Enter the Pssword min 6 Charcter");
    } else {
      const data = await fetch("http://localhost:3500/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const res = await data.json();
      // console.log(res);
      if (res.status === 201) {
        localStorage.setItem("usersdatatoken", res.result.token);
        toast.success("Login Sucessfully", {
          position: "top-center",
        });
        navigate("/Dashboard");
        setInpval({
          ...inpval,
          email: "",
          password: "",
        });
      } else if (res.status === 420) {
        toast.warning("Wrong Password", {
          position: "top-center",
        });
      } else if (res.status === 404) {
        toast.info("User is Not Existed", {
          position: "top-center",
        });
      }
    }
  };
  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back , Login</h1>
            <p>Hi, we are you glad you are back. Please Login</p>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                onChange={setVal}
                value={inpval.email}
                id="email"
                placeholder="Enter your Email Address"
                required
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  name="password"
                  onChange={setVal}
                  value={inpval.password}
                  id="password"
                  placeholder="Enter your Password"
                  required
                />
                <div
                  className="showpass"
                  onClick={() => setpassShow(!passShow)}
                >
                  {!passShow ? (
                    <span>Show</span>
                  ) : (
                    <span>Hide</span>
                  )}
                </div>
              </div>
            </div>
            <button className="btn" onClick={loginuser}>
              Login
            </button>
            <p>
              Don't Have a Account?{" "}
              <NavLink to="/register">Create Account</NavLink>
            </p>
            <p>
            Forgot Password {" "} 
              <NavLink to="/forgot"> Click Here</NavLink>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;

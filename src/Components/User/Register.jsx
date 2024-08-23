import React, { useState } from "react";
import "./Mix.css";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [passShow, setpassShow] = useState(false);
  const [cpassShow, setCpassShow] = useState(false);
  const navigate = useNavigate();

  const [inpval, setInpval] = useState({
    fname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const setVal = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;

    setInpval(() => {
      return { ...inpval, [name]: value };
    });
  };

  const addUserdata = async (e) => {
    e.preventDefault();

    const fname = inpval.fname;
    const email = inpval.email;
    const password = inpval.password;
    const cpassword = inpval.cpassword;

    if (fname === "") {
      toast.error("Please enter your name");
    } else if (email === "") {
      toast.error("Please enter your email");
    } else if (!email.includes("@") || !email.includes(".com")) {
      toast.warning("Please Vaild Email");
    } else if (password === "") {
      toast.error("Please enter your password");
    } else if (password.length < 6) {
      toast.warning("Plase Enter the Pssword min 6 Charcter");
    } else if (cpassword === "") {
      toast.error("Please enter your password");
    } else if (cpassword.length < 6) {
      toast.error("Plase Enter the Pssword min 6 Charcter");
    } else if (password !== cpassword) {
      toast.warning("Password does not match.");
    } else {
      const data = await fetch("http://localhost:3500/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname,
          email,
          password,
          cpassword,
        }),
      });

      const res = await data.json();
      // console.log(res.status);
      if (res.status === 201) {
        toast.success("User Register Sucessfully! Now Login", {
          position: "top-center",
        });
        navigate("/");
      } else if (res.status === 422) {
        toast.warning("This User is already exists!", {
          position: "top-center",
        });
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <section>
      <div className="form_data">
        <div className="form_heading">
          <h1>Create Account</h1>
          <p>
            We are glad you will be using Project Cloud to manage
            <br /> you tasks! We hope that you will get like it.
          </p>
        </div>

        <form>
          <div className="form_input">
            <label htmlFor="fname">Full Name</label>
            <input
              type="text"
              onChange={setVal}
              value={inpval.fname}
              name="fname"
              id="fname"
              placeholder="Enter your Full Name"
            />
          </div>
          <div className="form_input">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              onChange={setVal}
              value={inpval.email}
              name="email"
              id="email"
              placeholder="Enter your Email Address"
            />
          </div>

          <div className="form_input">
            <label htmlFor="password">Password</label>
            <div className="two">
              <input
                type={!passShow ? "password" : "text"}
                onChange={setVal}
                value={inpval.password}
                name="password"
                id="password"
                placeholder="Enter your Password"
              />
              <div className="showpass" onClick={() => setpassShow(!passShow)}>
                {!passShow ? (
                  <i class="fa-solid fa-eye-slash"></i>
                ) : (
                  <i class="fa-solid fa-eye"></i>
                )}
              </div>
            </div>
          </div>

          <div className="form_input">
            <label htmlFor="password">Confirm Password</label>
            <div className="two">
              <input
                type={!cpassShow ? "password" : "text"}
                onChange={setVal}
                value={inpval.cpassword}
                name="cpassword"
                id="cpassword"
                placeholder="Confirm Password"
              />
              <div
                className="showpass"
                onClick={() => setCpassShow(!cpassShow)}
              >
                {!cpassShow ? (
                  <i class="fa-solid fa-eye-slash"></i>
                ) : (
                  <i class="fa-solid fa-eye"></i>
                )}
              </div>
            </div>
          </div>

          <button className="btn" onClick={addUserdata}>
            Create Account
          </button>
          <p>
            {" "}
            Already have an account? <NavLink to="/">Login</NavLink>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;

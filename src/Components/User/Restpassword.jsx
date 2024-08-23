import React, { useState } from "react";
import "./Mix.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Restpassword = () => {
  const navigate = useNavigate();
  const [inpval, setInpval] = useState({
    password: "",
  });
  const { id, token } = useParams();

  const setVal = (e) => {
    const { name, value } = e.target;

    setInpval(() => {
      return { ...inpval, [name]: value };
    });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const password = inpval.password;

    if (password === "") {
      toast.error("Please Enter your Password");
    } else if (password.length < 6) {
      toast.warn("Please enter the Valid Email Address");
    } else {
      try {
        const data = await fetch(`http://localhost:3500/Rest-Password/${id}/${token}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
          }),
        });

        const res = await data.json();
        console.log(res);
        if (res.status === 201) {
          toast.success("Password Sucessfully", {
            position: "top-center",
          });
          navigate("/");
        } else if (res.status === 420) {
          toast.warning("This User is not Existed", {
            position: "top-center",
          });
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Rest Password</h1>
          </div>

          <form onSubmit={HandleSubmit}>
            <div className="form_input">
              <label htmlFor="email">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={inpval.password}
                onChange={setVal}
                placeholder="Enter your New Password"
              />
            </div>

            <button className="btn" type="submit">
              Rest Password
            </button>
            <p>
              {" "}
              Already have an account? <NavLink to="/">Login</NavLink>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Restpassword;
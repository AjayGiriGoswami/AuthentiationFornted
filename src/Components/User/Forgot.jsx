import React, { useState } from "react";
import "./Mix.css";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Forgot = () => {
  const navigate = useNavigate()
  const [inpval, setInpval] = useState({
    email: "",
  });

  const setVal = (e) => {
    const { name, value } = e.target;

    setInpval(() => {
      return { ...inpval, [name]: value };
    });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const email = inpval.email;

    if (email === "") {
      toast.error("Please Enter your Email");
    } else if (!email.includes("@") || !email.includes(".com")) {
      toast.warn("Please enter the Valid Email Address");
    } else {
      const data = await fetch("http://localhost:3500/Forgot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const res = await data.json();
      console.log(res);
      if (res.status === 201) {
        toast.success("Link Send in email Sucessfully!", {
          position: "top-center",
        });
        navigate("/");
      } else if (res.status === 420) {
        toast.warning("This User is not Existed", {
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
            <h1>Forgot Password</h1>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={inpval.email}
                onChange={setVal}
                placeholder="Enter your Email Address"
              />
            </div>

            <button className="btn" onClick={HandleSubmit}>
              Send
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

export default Forgot;

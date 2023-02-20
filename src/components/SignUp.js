import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { Link, useNavigate, useLocation } from "react-router-dom";
import avatar from "../images/avatar.jpg";
import { signUp } from "../utility-files/authenticate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.state?.from ? location.state?.from : "/";
  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  function updateDetails(events) {
    setDetails((prevDetails) => ({
      ...prevDetails,
      [`${events.target.name}`]: events.target.value,
    }));
  }

  async function highSignUp(details, path) {
    const low = await signUp(details);
    if (low == 1) {
      navigate(path);
    } else {
      toast.error(
        low === -1
          ? "Invalid Email"
          : low === -2
          ? "Password should be atleast 6 letters long"
          : low === -3
          ? "Usename should be alpha-numeric only"
          : "Incorrect Email Password combination",
        {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
  }

  return (
    <form className="SignIn--card">
      <img
        className="SignIn--card--profile"
        src={avatar}
        alt="Profile Avatar"
      />
      <Input
        text="Username"
        type="text"
        name="username"
        onchange={updateDetails}
        val={details.username}
      />
      <Input
        text="Email"
        type="email"
        name="email"
        onchange={updateDetails}
        val={details.email}
      />
      <Input
        text="Password"
        type="password"
        name="password"
        onchange={updateDetails}
        val={details.password}
      />
      <Button text="Sign Up" handleClick={() => highSignUp(details, path)} />
      <h4 className="card--switch--signup">
        Already have an account?{" "}
        <Link to="/login" replace state={{ from: path }}>
          <u>Log In</u>
        </Link>
      </h4>
      <ToastContainer />
    </form>
  );
}

export default SignUp;

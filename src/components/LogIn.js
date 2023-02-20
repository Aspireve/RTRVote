import React from "react";
import Button from "./Button";
import Input from "./Input";
import { Link, useNavigate, useLocation } from "react-router-dom";
import avatar from "../images/avatar.jpg";
import { logIn } from "../utility-files/authenticate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LogIn() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.state?.from ? location.state?.from : "/";
  const [details, setDetails] = React.useState({
    email: "",
    password: "",
  });

  function updateDetails(events) {
    setDetails((prevDetails) => ({
      ...prevDetails,
      [`${events.target.name}`]: events.target.value,
    }));
  }

  async function highLogIn(details, path) {
    const low = await logIn(details);
    if (low == 1) { 
      navigate(path);
    } else {
      toast.error(
        low === -1
          ? "Invalid Email"
          : low === -2
          ? "Password should be atleast 6 letters long"
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
        text="Email"
        type="text"
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
      <Button text="Log In" handleClick={() => highLogIn(details, path)} />
      <h3 className="card--forgot--pass">Forgot Password</h3>
      <h4 className="card--switch--signup">
        Don't have an account?{" "}
        <Link to="/signup" replace state={{ from: path }}>
          <u>Sign Up</u>
        </Link>
      </h4>
      <ToastContainer />
    </form>
  );
}

export default LogIn;

import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <div className="box">
        <h1>Register</h1>

        <input type="text" placeholder="Enter Name" />
        <input type="email" placeholder="Enter Email" />
        <input type="password" placeholder="Enter Password" />

        <button onClick={handleRegister}>Register</button>

        <p>
          Already have account?
          <Link to="/"> Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
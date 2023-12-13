import React, { useState } from "react";
import "./Register.css";
import axios from "../../Services/axiosInterceptor";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Register() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("user/register", { ...input });
      Swal.fire({
        text: "Signup successfully",
        icon: "success",
      });
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      Swal.fire({
        text: error.response.data.error,
        icon: "warning",
      });
    }
  };

  const appStyle = {
    backgroundImage:
      'url("http://getwallpapers.com/wallpaper/full/a/5/d/544750.jpg")',
    backgroundSize: "157% ",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    fontFamily: "'Numans', sans-serif",
  };

  return (
    <div className="" style={appStyle}>
      <div className="d-flex justify-content-center h-100">
        <div className="card" style={{ width: "500px" }}>
          <div className="card-header">
            <h3>Sign Up</h3>
            <div className="d-flex justify-content-end social_icon">
              <span>
                <i className="fab fa-google-plus-square"></i>
              </span>
              <span>
                <i className="fab fa-twitter-square"></i>
              </span>
            </div>
          </div>
          <div className="card-body">
            <form onSubmit={handleRegister}>
              <div
                className="input-group form-group"
                style={{ marginBottom: "20px" }}
              >
                <div className="input-group-prepend">
                  <span className="input-group-text">Email</span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={input.name}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  placeholder="Email"
                />
              </div>
              <div
                className="input-group form-group"
                style={{ marginBottom: "20px" }}
              >
                <div className="input-group-prepend">
                  <span className="input-group-text">Password</span>
                </div>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={input.name}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  placeholder="password"
                />
              </div>

              <div className="form-group">
                <input
                  type="submit"
                  value="Signup"
                  className="btn float-center login_btn"
                  style={{ backgroundColor: "#FFC312" }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;

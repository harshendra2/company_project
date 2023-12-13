import React, { useState } from "react";
import "./login.css";
import axios from "../../Services/axiosInterceptor";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("user/login", { ...input });
      Swal.fire({
        text: "Login successfully",
        icon: "success",
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.userToken);
        navigate("/home");
      }
    } catch (error) {
      Swal.fire({
        text: error.response.data.error,
        icon: "warning",
      });
    }
  };

  const appStyle = {
    backgroundImage: 'url("http://getwallpapers.com/wallpaper/full/a/5/d/544750.jpg")',
    backgroundSize: "cover",  // Use 'cover' to make the image cover the entire container
    backgroundRepeat: "no-repeat",
    height: "100vh",
    fontFamily: "'Numans', sans-serif",
  };
  

  return (
    <div className="" style={appStyle}>
      <div className="d-flex justify-content-center h-100 ">
        <div className="card" >
          <div className="card-header">
            <h3>Sign In</h3>
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
            <form onSubmit={handleSubmit}>
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
                  value="Login"
                  className="btn float-right login_btn"
                  style={{ backgroundColor: " #FFC312" }}
                />
              </div>
            </form>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-center links">
              Don't have an account?
              <a onClick={() => navigate("/register")}>Sign Up</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

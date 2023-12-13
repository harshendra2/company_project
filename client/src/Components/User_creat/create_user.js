import React, { useEffect, useState } from "react";
import axios from "../../Services/axiosInterceptor";
import PhoneNumberValidation from "./PhoneNum";
import Location from "../User_creat/Country_selector";
import { useDispatch, useSelector } from "react-redux";
import { setInput, resetInput } from "../../Redux/image/imageSlice";
import Swal from "sweetalert2";

function User({ setCreatuserhiden }) {
  const dispatch = useDispatch();
  const inputs = useSelector((state) => state.input.value);

  const [input, setInputs] = useState({
    FirstName: " ",
    LastName: " ",
    email: "",
    Address1: " ",
    Address2: " ",
    ZipCode: "",
  });

  useEffect(() => {
    dispatch(
      setInput({
        ...inputs,
        FirstName: input.FirstName,
        LastName: input.LastName,
        email: input.email,
        Address1: input.Address1,
        Address2: input.Address2,
        ZipCode: input.ZipCode,
      })
    );
  }, [input]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleCreteUser = async (e) => {
    const { FirstName, LastName, email, Address1 } = inputs;

    if (FirstName.length === 0) {
      Swal.fire({
        text: "Please enter First Name",
        icon: "warning",
      });
    } else if (FirstName.length < 5) {
      Swal.fire({
        text: "Minimum 5 characters required for FirstName",
        icon: "warning",
      });
    } else if (LastName.length === 0) {
      Swal.fire({
        text: "Please enter Last Name",
        icon: "warning",
      });
    } else if (LastName.length < 5) {
      Swal.fire({
        text: "Minimum 5 characters required for LastName",
        icon: "warning",
      });
    } else if (email.length === 0) {
      Swal.fire({
        text: "Please enter an email",
        icon: "warning",
      });
    } else if (!emailRegex.test(email)) {
      Swal.fire({
        text: "Please enter a correct email address",
        icon: "warning",
      });
    } else if (Address1.length < 6) {
      Swal.fire({
        text: "Please enter a correct address 1",
        icon: "warning",
      });
    } else {
      try {
        const response = await axios.post("user/create", inputs);

        if (response.status === 200) {
          Swal.fire({
            text: "User created successfully",
            icon: "success",
          });
        }
        setCreatuserhiden((state) => !state);
        dispatch(resetInput());
      } catch (error) {
        Swal.close();
      }
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
    <div className="d-flex justify-content-center h-100">
      <div className="card" style={{ width: "1400px" }}>
        <div className="card-header">
          <div>
            <div className="flex flex-wrap gap-3 bg-black-300 rounded-lg p-6">
              <div>
                <p className="text-teal-800 font-semibold">First Name:</p>
                <input
                  type="text"
                  className="form-control"
                  name="FirstName"
                  value={input.name}
                  onChange={(e) =>
                    setInputs({ ...input, [e.target.name]: e.target.value })
                  }
                  placeholder="First Name"
                />
              </div>

              <div>
                <p className="text-teal-800 font-semibold">Last Name:</p>
                <input
                  type="text"
                  className="form-control"
                  name="LastName"
                  value={input.name}
                  onChange={(e) =>
                    setInputs({ ...input, [e.target.name]: e.target.value })
                  }
                  placeholder="Last Name"
                />
              </div>

              <div>
                <p className="text-teal-800 font-semibold">Email :</p>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={input.name}
                  onChange={(e) =>
                    setInputs({ ...input, [e.target.name]: e.target.value })
                  }
                  placeholder="Email"
                />
              </div>

              <div>
                <p className="text-teal-800 font-semibold">Address 1 :</p>
                <input
                  type="text"
                  className="form-control"
                  name="Address1"
                  value={input.name}
                  onChange={(e) =>
                    setInputs({ ...input, [e.target.name]: e.target.value })
                  }
                  placeholder="Address 1"
                />
              </div>

              <div>
                <p className="text-teal-800 font-semibold">Address 2 :</p>
                <input
                  type="text"
                  className="form-control"
                  name="Address2"
                  value={input.name}
                  onChange={(e) =>
                    setInputs({ ...input, [e.target.name]: e.target.value })
                  }
                  placeholder="Address 2"
                />
              </div>

              <div>
                <p className="text-teal-800 font-semibold">ZipCode :</p>
                <input
                  type="Number"
                  className="form-control"
                  name="ZipCode"
                  value={input.name}
                  onChange={(e) =>
                    setInputs({ ...input, [e.target.name]: e.target.value })
                  }
                  placeholder="ZipCode"
                />
              </div>

              <PhoneNumberValidation />

              <Location />
            </div>
          </div>
        </div>
        <button
          onClick={handleCreteUser}
          style={{ color: "black", backgroundColor: "yellow" }}
        >
          Create
        </button>
      </div>
    </div>
  );
}
export default User;

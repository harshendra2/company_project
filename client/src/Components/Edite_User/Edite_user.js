import React, { useEffect, useState } from "react";
import axios from "../../Services/axiosInterceptor";
import PhoneNumberValidations from "./Phone_num";
import Locations from "./Country_selectors";
import { useDispatch, useSelector } from "react-redux";
import { setInput } from "../../Redux/image/imageSlice";
import Swal from "sweetalert2";

function EditUser({ setCreatuserhiden, id }) {
  const dispatch = useDispatch();
  const inputs = useSelector((state) => state.input.value);

  const [input, setInputs] = useState({
    FirstName: " ",
    LastName: " ",
    email: "",
    Address1: " ",
    Address2: " ",
    ZipCode: "",
    MobileNumber: "",
    State: "",
    City: "",
    Country: "",
  });

  async function getData() {
    let data = await axios.post("user/get", { id });
    setInputs({
      ...input,
      FirstName: data.data.FirstName,
      LastName: data.data.LastName,
      email: data.data.email,
      Address1: data.data.Address1,
      Address2: data.data.Address2,
      ZipCode: data.data.ZipCode,
      MobileNumber: data.data.MobileNumber,
      State: data.data.State,
      City: data.data.City,
      Country: data.data.Country,
    });
  }

  useEffect(() => {
    getData();
  }, []);

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
        MobileNumber: input.MobileNumber,
        City: input.City,
        State: input.State,
        Country: input.Country,
      })
    );
  }, [input]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEditUser = async (e) => {
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
        const response = await axios.put("user/edit", { ...inputs, id });

        if (response.status === 200) {
          Swal.fire({
            text: "User edited successfully",
            icon: "success",
          });
        }
        setCreatuserhiden((state) => !state);
      } catch (error) {
        Swal.close();
      }
    }
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
                  value={input.FirstName}
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
                  value={input.LastName}
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
                  value={input.email}
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
                  value={input.Address1}
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
                  value={input.Address2}
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
                  value={input.ZipCode}
                  onChange={(e) =>
                    setInputs({ ...input, [e.target.name]: e.target.value })
                  }
                  placeholder="ZipCode"
                />
              </div>

              <PhoneNumberValidations />

              <Locations />
            </div>
          </div>
        </div>
        <button
          onClick={handleEditUser}
          style={{ color: "black", backgroundColor: "yellow" }}
        >
          Edite
        </button>
      </div>
    </div>
  );
}
export default EditUser;

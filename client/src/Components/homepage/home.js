import { useState, useEffect } from "react";
import User from "../User_creat/create_user";
import EditUser from "../Edite_User/Edite_user";
import Navbars from "../Navbar/Navbar";
import axios from "../../Services/axiosInterceptor";
import Swal from "sweetalert2";

function Home() {
  const [createhiden, setCreatuserhiden] = useState(false);
  const [Edituserhiden, SetEdituserhiden] = useState(false);
  const [tempId, setTempId] = useState();
  const [state, setState] = useState([]);
  
  const appStyle = {
    backgroundImage: 'url("http://getwallpapers.com/wallpaper/full/a/5/d/544750.jpg")',
    backgroundSize: "cover",  // Use 'cover' to make the image cover the entire container
    backgroundRepeat: "no-repeat",
    height: "100vh",
    fontFamily: "'Numans', sans-serif",
  };
  

  async function getdata() {
    let data = await axios.get("/user/getall");
    setState([...data.data]);
  }

  useEffect(() => {
    getdata();
  }, [state]);

  async function DeleteUser(id) {
    try {
      const confirmResult = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (confirmResult.isConfirmed) {
        let response = await axios.post("/user/delete", { id: id });

        Swal.fire({
          text: "User deleted successfully!",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      Swal.fire({
        text: "Error deleting user. Please try again later.",
        icon: "error",
      });
    }
  }

  return (
    <div className="" style={appStyle}>
      <Navbars />
      {Edituserhiden === true ? (
        <EditUser setCreatuserhiden={SetEdituserhiden} id={tempId} />
      ) : createhiden === true ? (
        <User setCreatuserhiden={setCreatuserhiden} />
      ) : (
        <div className="d-flex justify-content-center h-100">
          <div className="overflow-x-auto mt-10">
            <table className="min-w-full bg-blue border border-white-300 text-sm">
              <thead>
                <tr>
                  <th className="py-1 px-2 border-b text-white">ID</th>
                  <th className="py-1 px-2 border-b text-white">First Name</th>
                  <th className="py-1 px-2 border-b text-white">Last Name</th>
                  <th className="py-1 px-2 border-b text-white">Email</th>
                  <th className="py-1 px-2 border-b text-white">
                    Mobile Number
                  </th>
                  <th className="py-1 px-2 border-b text-white">Address 1</th>
                  <th className="py-1 px-2 border-b text-white">Address 2</th>
                  <th className="py-1 px-2 border-b text-white">Country</th>
                  <th className="py-1 px-2 border-b text-white">State</th>
                  <th className="py-1 px-2 border-b text-white">City</th>
                  <th className="py-1 px-2 border-b text-white">ZipCode</th>
                  <th className="py-1 px-2 border-b text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {state.map((temp, index) => (
                  <tr key={index}>
                    <td className="py-1 px-2 border-b text-white">
                      {index + 1}
                    </td>
                    <td className="py-1 px-2 border-b text-white">
                      {temp.FirstName}
                    </td>
                    <td className="py-1 px-2 border-b text-white">
                      {temp.LastName}
                    </td>
                    <td className="py-1 px-2 border-b text-white">
                      {temp.email}
                    </td>
                    <td className="py-1 px-2 border-b text-white">
                      {temp.MobileNumber}
                    </td>
                    <td className="py-1 px-2 border-b text-white">
                      {temp.Address1}
                    </td>
                    <td className="py-1 px-2 border-b text-white">
                      {temp.Address2}
                    </td>
                    <td className="py-1 px-2 border-b text-white">
                      {temp.Country}
                    </td>
                    <td className="py-1 px-2 border-b text-white">
                      {temp.State}
                    </td>
                    <td className="py-1 px-2 border-b text-white">
                      {temp.City}
                    </td>
                    <td className="py-1 px-2 border-b text-white">
                      {temp.ZipCode}
                    </td>
                    <td className="py-1 px-2 border-b">
                      <button
                        className="bg-blue-500 text-white py-1 px-2 rounded"
                        onClick={() => {
                          SetEdituserhiden(true);
                          setTempId(temp._id);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white py-1 px-2 rounded ml-2"
                        onClick={() => DeleteUser(temp._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={() => setCreatuserhiden(true)}
              style={{ backgroundColor: "yellow" }}
            >
              Create User
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

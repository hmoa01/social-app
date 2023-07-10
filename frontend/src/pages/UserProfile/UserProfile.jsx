import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import UserService from "../../services/userService";
import { toast } from "react-toastify";
import moment from "moment";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [edit, setEditProfile] = useState(false);
  const [edited, setIsEdited] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    UserService.getSingleUser(id)
      .then((res) => setUser(res))
      .catch((error) => console.log(error));
  }, [edited]);

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      birthDate: user?.birthDate || "",
      gender: user?.gender || "",
      role: user?.role || "",
    },
    enableReinitialize: true,

    // validacija
    onSubmit: (values) => {
      UserService.updateUser(user._id, { ...values })
        .then((data) => {
          if (data.status === 200) {
            setIsEdited(true);
            toast.success("User updated");
          } else {
            toast.warning("User not updated");
          }
        })
        .catch((err) => console.log(err));
    },
  });

  const handleEditProfile = () => {
    setEditProfile(!edit);
  };

  return (
    <div className="flex mt-[30px] w-[400px] md:h-[750px] md:w-[1350px] rounded-lg border border-primary overflow-hidden">
      <div className="w-1/4 bg-gray-500 border border-primary bg-lightGray flex flex-col">
        <button className="font-semibold text-xl bg-primary color-white text-white h-[50px]">
          My Profile
        </button>
        <button className="font-semibold text-xl bg-darkGray color-white text-white h-[50px]">
          My Memories
        </button>
      </div>
      <div className="w-[80%] mt-[20px]">
        <div className="flex justify-center">
          {user.image ? (
            <img
              src={user.image}
              alt="profile-img"
              className="w-[217px] h-[211px] p-3 object-cover rounded-full cursor-pointer"
            />
          ) : (
            <div
              className={`rounded-full flex bg-primary w-[217px] h-[211px] justify-center items-center cursor-pointer`}
            >
              {/* <span className="text-white">{ user.firstName.charAt(0) }</span>*/}
              <span className="text-white text-xl">{user.firstName}</span>
            </div>
          )}
        </div>
        <form onSubmit={formik.handleSubmit} className="p-[26px] mt-[14px]">
          <div className="flex-row w-[512px] mx-auto">
            <div className="mt-[10px]">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                disabled={!edit}
              />

              <input
                type="text"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                placeholder="Last name"
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                disabled={!edit}
              />

              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="Email"
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                disabled={!edit}
              />

              <input
                type="text"
                name="birthDate"
                value={
                  formik.values.birthDate
                    ? moment(formik.values.birthDate).format("DD-MM-YYYY")
                    : ""
                }
                onChange={formik.handleChange}
                placeholder="Date of birth"
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                disabled={!edit}
              />
            </div>
            <div className="mt-[10px]">
              <label>Gender</label>
              <select
                className="form-input w-full h-[35px] border rounded-md"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                disabled={!edit}
              >
                <option value=""> Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            {user.role === "admin" ? (
              <div className="mt-[10px]">
                <label>Role</label>
                <select
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  className="form-input w-full h-[35px] border rounded-md"
                  name="gender"
                  disabled={!edit}
                >
                  <option value=""> Select</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            ) : (
              <div className="mt-3 mb-3">
                <span>ROLE: {user.role}</span>
              </div>
            )}
            <div className="mt-[10px]">
              {edit ? (
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={handleEditProfile}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;

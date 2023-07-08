import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFormik } from "formik";
import UserService from "../../services/userService";
import { toast } from "react-toastify";
import moment from "moment";
import { AiOutlineFileAdd } from "react-icons/ai";
import { FileParser } from "../../utils/FileParser";

const UserProfile = () => {
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    UserService.getUser(id)
      .then((res) => {
        setUser(res.data.user[0]);
        console.log(user);
      })
      .catch((error) => console.log(error));
  }, [edit]);

  const formik = useFormik({
    initialValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      birthDate: moment(user.birthDate).format("YYYY-MM-DD") || "",
      gender: user.gender || "",
      role: user.role || "",
      image: user.image || null,
    },
    enableReinitialize: true,

    // validacija
    onSubmit: (values) => {
      FileParser(values.image).then((res) => {
        UserService.editUser(user._id, {
          ...values,
          image: res,
          birthDate: moment(values.birthDate).toISOString(),
        })
          .then((data) => {
            if (data.status === 200) {
              console.log(values.birthDate);
              setEdit(!edit);
              toast.success("User updated");
            } else {
              toast.warning("User not updated");
            }
          })
          .catch((err) => console.log(err));
      });
    },
  });

  return (
    <div className="flex mt-[30px] h-[750px] w-[1350px] rounded-lg border border-primary overflow-hidden">
      <div className="w-1/4 bg-gray-600 h-full flex flex-col items-center ">
        <Link
          to={`/userProfile/${id}`}
          className="bg-primary p-3 text-white text-2xl font-bold w-full h-[60px]"
        >
          My Profile
        </Link>
      </div>

      <div className="w-[80%] mt-[20px]">
        <div className="flex justify-center">
          {user.image ? (
            <div className="relative">
              <img
                src={user.image}
                alt="profile-img"
                className="w-[217px] h-[211px] p-3 object-cover rounded-full cursor-pointer"
              />
              {edit ? (
                <div className="absolute top-4 right-1">
                  <label htmlFor="image" className="">
                    <AiOutlineFileAdd className="text-2xl cursor-pointer" />
                  </label>
                  <input
                    id="image"
                    type="file"
                    name="image"
                    onChange={(e) => {
                      formik.setFieldValue(e.target.name, e.target.files[0]);
                    }}
                    className="hidden"
                  />
                </div>
              ) : null}
            </div>
          ) : (
            <div className="rounded-full relative flex bg-primary w-[217px] h-[211px] justify-center items-center cursor-pointer`">
              <span className="text-white text-xl">{user.firstName}</span>

              {edit ? (
                <div className="absolute top-1 right-1">
                  <label htmlFor="image" className="">
                    <AiOutlineFileAdd className="text-2xl cursor-pointer" />
                  </label>
                  <input
                    id="image"
                    type="file"
                    name="image"
                    onChange={(e) => {
                      formik.setFieldValue(e.target.name, e.target.files[0]);
                    }}
                    className="hidden"
                  />
                </div>
              ) : null}
            </div>
          )}
        </div>
        <form
          onSubmit={formik.handleSubmit}
          flex
          className="flex flex-col w-[600px] mx-auto p-[26px] mt-[14px] gap-3"
        >
          <input
            type="text"
            name="firstName"
            placeholder={user.firstName}
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
            placeholder={user.lastName}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            disabled={!edit}
          />

          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder={user.email}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            disabled={!edit}
          />

          <input
            type="date"
            name="birthDate"
            value={formik.values.birthDate ? formik.values.birthDate : ""}
            onChange={formik.handleChange}
            placeholder={() => moment(user.birthDate).format("YYYY-MM-DD")}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            disabled={!edit}
          />
          <div>
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
              <label className="text-red-600">Role</label>
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
              <h2 className="text-red-600 font-bold text-lg">
                ROLE: <span className="text-primary">{user.role}</span>
              </h2>
            </div>
          )}
          {!edit ? (
            <h2
              type="button"
              onClick={() => setEdit(!edit)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-center rounded cursor-pointer"
            >
              Edit
            </h2>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserProfile;

import React from "react";
import { useNavigate } from "react-router-dom";
import Image from "../../components/Image/Image";
import registerImg from "../../assests/register-img.png";
import HeadingTitle from "../../components/HeadingTitle/HeadingTitle";
import LinkInfo from "../../components/LinkInfo/LinkInfo";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FileParser } from "../../utils/FileParser";
import userService from "../../services/userService";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const VALID_TYPE = ["image/jpg", "image/jpeg", "image/png"];
  const KB = 1024;
  const MB = KB * 1024;

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: "",
      image: "",
      birthDate: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Field is required"),
      lastName: Yup.string().required("Field is required"),
      email: Yup.string().required("Field is required"),
      password: Yup.string().required("Field is required"),
      gender: Yup.string().required("Field is required"),
      birthDate: Yup.string().required("Field is required"),
      image: Yup.mixed()
        .required("Field is required")
        .test("fileSize", "Wrong file size", (value) => value.size < MB * 2)
        .test("fileType", "Wrong file type", (value) =>
          VALID_TYPE.includes(value.type)
        ),
    }),
    onSubmit: (values) => {
      FileParser(values.image)
        .then((res) => {
          userService
            .registerUser({ ...values, image: res })
            .then((data) => {
              if (data.status === 200) {
                toast.success("Your registration is succesful!");
                setTimeout(() => navigate("/login"), 3000);
              } else {
                toast.warning("User already registred!");
              }
            })
            .catch((error) => toast.warning(error.response.data.msg));
        })
        .catch((error) => console.log(error));

      formik.resetForm();
    },
  });

  const showError = (name) =>
    formik.errors[name] && formik.touched[name] && formik.errors[name];

  return (
    <div className="flex gap-8">
      <Image alt="register-img" image={registerImg} />
      <div className="flex flex-col">
        <HeadingTitle title="REGISTER" />
        <form
          onSubmit={formik.handleSubmit}
          className="mt-[30px] flex flex-col w-[647px] border border-primary p-5 rounded-lg"
        >
          <label>
            First name:{" "}
            <span className="text-red-600">{showError("firstName")}</span>
          </label>
          <input
            type="text"
            placeholder="Type your name."
            value={formik.values.firstName}
            onChange={formik.handleChange}
            name="firstName"
            className="w-[595px] h-[37px] rounded-md border border-[#A1A0A0] p-2"
          />
          <label>
            Last name:{" "}
            <span className="text-red-600">{showError("lastName")}</span>
          </label>
          <input
            type="text"
            placeholder="Type your last name."
            value={formik.values.lastName}
            onChange={formik.handleChange}
            name="lastName"
            className="w-[595px] h-[37px] rounded-md border border-[#A1A0A0] p-2"
          />
          <label>
            Email: <span className="text-red-600">{showError("email")}</span>
          </label>
          <input
            type="email"
            placeholder="Type your email."
            value={formik.values.email}
            onChange={formik.handleChange}
            name="email"
            className="w-[595px] h-[37px] rounded-md border border-[#A1A0A0] p-2"
          />
          <label>
            Password:{" "}
            <span className="text-red-600">{showError("password")}</span>
          </label>
          <input
            type="password"
            placeholder="Type your password."
            value={formik.values.password}
            onChange={formik.handleChange}
            name="password"
            className="w-[595px] h-[37px]ormik. rounded-md border border-[#A1A0A0] p-2"
          />
          <label>
            Gender: <span className="text-red-600">{showError("gender")}</span>
          </label>
          <select
            name="gender"
            className="w-[595px] h-[37px]"
            value={formik.values.gender}
            onChange={formik.handleChange}
          >
            <option value="" defaultChecked>
              Gender
            </option>
            <option value="male">Male</option>
            <option value="female">female</option>
          </select>
          <label>
            Image: <span className="text-red-600">{showError("image")}</span>
          </label>
          <input
            type="file"
            name="image"
            className="w-[595px] h-[37px]"
            onChange={(e) =>
              formik.setFieldValue(e.target.name, e.target.files[0])
            }
          />
          <label>
            Birth date:{" "}
            <span className="text-red-600">{showError("birthDate")}</span>
          </label>
          <input
            type="date"
            name="birthDate"
            value={formik.values.birthDate}
            onChange={formik.handleChange}
            className="w-[595px] h-[37px] rounded-md border border-[#A1A0A0] p-2"
          />
          <button
            type="submit"
            className="h-[37px] w-[595px] bg-[#106CCA] text-[#fff] rounded-md items-center mt-4"
          >
            Register
          </button>
        </form>
        <LinkInfo
          title="Already have an account?"
          linkTitle="Click here to Sign in."
          link="/login"
        />
      </div>
    </div>
  );
};

export default Register;

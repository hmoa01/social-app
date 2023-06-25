import React from "react";
import Image from "../../components/Image/Image";
import loginImage from "../../assests/login-img.png";
import HeadingTitle from "../../components/HeadingTitle/HeadingTitle";
import LinkInfo from "../../components/LinkInfo/LinkInfo";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/userSlice";
import userService from "../../services/userService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Type your email"),
      password: Yup.string().required("Type your password"),
    }),
    onSubmit: (values) => {
      userService
        .loginUser(values)
        .then((res) => {
          if (res.status === 200) {
            toast.success("You are logged in");
            localStorage.setItem("sa_token", res.data.token);
            dispatch(loginUser(res.data.user));
            setTimeout(() => navigate("/"), 2000);
          } else {
            toast.warning("You are not logged in");
          }
        })
        .catch((error) => {
          toast.error(error.response.data.msg);
        });
    },
  });

  const showError = (name) =>
    formik.errors[name] && formik.touched[name] && formik.errors[name];

  return (
    <div className=" mt-[30px] flex gap-8">
      <Image alt="login-img" image={loginImage} />
      <div className="flex flex-col">
        <HeadingTitle title="SIGN IN" />
        <form
          onSubmit={formik.handleSubmit}
          className="mt-[80px] mb-[40px] flex flex-col w-[647px] border border-primary p-5 rounded-lg"
        >
          <div>
            <label>
              <span className="text-red-600">{showError("email")}</span>
            </label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Type your email"
              className="w-[595px] h-[37px] rounded-md border border-[#A1A0A0] p-2"
            />
          </div>

          <div className="mt-[15px]">
            <label>
              <span className="text-red-600">{showError("password")}</span>
            </label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Type your password"
              className="w-[595px] h-[37px] rounded-md border border-[#A1A0A0] p-2"
            />
          </div>

          <button
            type="submit"
            className="h-[37px] w-[595px] bg-[#106CCA] text-[#fff] rounded-md items-center mt-4"
          >
            Login
          </button>
        </form>
        <LinkInfo
          title="Don't have an account?"
          linkTitle="Click here to Register."
          link="/register"
        />
      </div>
    </div>
  );
};

export default Login;

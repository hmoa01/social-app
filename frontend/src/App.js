import axios from "axios";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { restoreUser } from "./store/userSlice";

axios.defaults.baseURL = "http://localhost:4000/api";

axios.interceptors.request.use((config) => {
  if (localStorage.hasOwnProperty("sa_token")) {
    config.headers.Authorization = localStorage.getItem("sa_user");
  }
  return config;
});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreUser(JSON.parse(localStorage.getItem("sa_user"))));
  }, []);

  return (
    <div className="container mx-auto">
      <Navbar />
      <Outlet />
      <ToastContainer />
    </div>
  );
}

export default App;

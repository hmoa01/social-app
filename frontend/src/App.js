import axios from "axios";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = "http://localhost:4000/api";

function App() {
  return (
    <div className="container mx-auto">
      <Navbar />
      <Outlet />
      <ToastContainer />
    </div>
  );
}

export default App;

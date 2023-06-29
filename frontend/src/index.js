import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import { Provider } from "react-redux";
import store from "./store/store";
import Posts from "./pages/Posts/Posts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>ERROR</div>,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/posts",
        element: <Posts />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

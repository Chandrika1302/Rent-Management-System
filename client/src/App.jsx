import { createHashRouter } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Layout from "./layout/Layout";
import Error404 from "./layout/Error404";

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error404 />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login/",
        element: <Login />,
      },
    ],
  },
]);

export default router;

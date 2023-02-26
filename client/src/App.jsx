import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms.jsx";
import Layout from "./layout/Layout";
import Error404 from "./layout/Error404";
import CreateRoom from "./features/rooms/components/CreateRoom.jsx";
import { RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
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
      {
        path: "logout/",
        element: <Logout />,
      },
      {
        path: "rooms/",
        element: <Rooms />,
        exact: true,
      },
      {
        path: "rooms/create/",
        exact: true,
        element: <CreateRoom />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

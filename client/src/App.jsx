import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms.jsx";
import Tenants from "./pages/Tenants.jsx";
import Layout from "./layout/Layout";
import Error from "./layout/Error";
import CreateRoom from "./features/rooms/components/CreateRoom.jsx";
import RoomPage from "./features/rooms/components/RoomPage.jsx";
import CreateTenant from "./features/tenants/components/CreateTenant.jsx";
import TenantPage from "./features/tenants/components/TenantPage.jsx";
import { RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
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
      {
        path: "rooms/:id/",
        exact: true,
        element: <RoomPage />,
      },
      {
        path: "tenants/",
        element: <Tenants />,
        exact: true,
      },
      {
        path: "tenants/create/",
        exact: true,
        element: <CreateTenant />,
      },
      {
        path: "tenants/:id/",
        exact: true,
        element: <TenantPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Error message="Route Not Found" />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

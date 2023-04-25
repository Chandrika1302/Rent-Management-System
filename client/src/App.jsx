import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Signup from "./pages/Signup";
import Signout from "./pages/Signout";

import Home from "./pages/Home";
import Layout from "./layout/Layout";
import Error from "./layout/Error";

import Rooms from "./pages/Rooms.jsx";
import CreateRoom from "./features/rooms/components/CreateRoom.jsx";
import RoomPage from "./features/rooms/components/RoomPage.jsx";

import Tenants from "./pages/Tenants.jsx";
import CreateTenant from "./features/tenants/components/CreateTenant.jsx";
import TenantPage from "./features/tenants/components/TenantPage.jsx";

import Transactions from "./pages/Transactions.jsx";
import CreateTransaction from "./features/transactions/components/CreateTransaction.jsx";
import TransactionPage from "./features/transactions/components/TransactionPage.jsx";

import About from "./pages/About.jsx";

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
        path: "signup/",
        element: <Signup />,
      },
      {
        path: "signout/",
        element: <Signout />,
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
      {
        path: "transactions/",
        element: <Transactions />,
        exact: true,
      },
      {
        path: "transactions/create/",
        exact: true,
        element: <CreateTransaction />,
      },
      {
        path: "transactions/:id/",
        exact: true,
        element: <TransactionPage />,
      },
      {
        path: "about/",
        exact: true,
        element: <About />,
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

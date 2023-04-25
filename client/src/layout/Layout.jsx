import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Container } from "@mui/material";

import Header from "./Header";
import Footer from "./Footer";
import { selectUserName } from "../features/user/userSlice";
import { useEffect } from "react";

function Layout({ children }) {
  const user = useSelector(selectUserName);
  const navigate = useNavigate();

  const path = useLocation().pathname;

  const ignoredPaths = ["/login", "/signup"];

  useEffect(() => {
    if (user == null && !ignoredPaths.includes(path)) {
      return navigate("/login");
    }

    if (user !== null && ignoredPaths.includes(path)) {
      return navigate("/");
    }
  }, [path, user]);

  return (
    <Box>
      <Header />
      <ToastContainer />
      <Container sx={{ mt: 3 }}>
        <Outlet />
        {children}
      </Container>
      <Footer />
    </Box>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;

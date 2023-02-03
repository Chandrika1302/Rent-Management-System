import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { Box, Container } from "@mui/material";

import Header from "./Header";
import Footer from "./Footer";
import { selectUserName } from "../features/user/userSlice";
import { useEffect } from "react";

function Layout({ children }) {
  const user = useSelector(selectUserName);
  const navigate = useNavigate();

  const path = useLocation().pathname;

  useEffect(() => {
    if (user == null && path != "/login") {
      return navigate("/login");
    }

    if (user !== null && path == "/login") {
      return navigate("/");
    }
  }, [path, user]);

  return (
    <Box>
      <Header />
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

import { Outlet } from "react-router-dom";

import { Box, Container } from "@mui/material";

import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  return (
    <Box>
      <Header />
      <Container sx={{ mt: 3 }}>
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
}

export default Layout;

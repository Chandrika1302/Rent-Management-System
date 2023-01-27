import { Box, Container } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <Box>
      <Header />
      <Container sx={{mt:3}}>
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
}

export default Layout;

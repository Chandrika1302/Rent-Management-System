import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function AboutPara() {
  return (
    <Box>
      <Typography
        component="p"
        sx={{
          display: "block",
          mb: 2,
        }}
      >
        Welcome to our Rent Management System, a small yet powerful web
        application developed by a group of 6 individuals using React and
        ExpressJS as the backend. The primary focus of this project was to learn
        and gain experience in creating scalable and efficient web applications.
      </Typography>

      <Typography
        component="p"
        sx={{
          display: "block",
          mb: 2,
        }}
      >
        Our Rent Management System is designed to help property owners and
        tenants manage their rental properties with ease. With this system,
        property owners can manage their properties, track rent payments, and
        generate financial reports. Meanwhile, tenants can view their rental
        history, pay rent online, and communicate with their landlords. Our team
        has worked tirelessly to ensure that the system is user-friendly and
        easy to navigate, making it the perfect solution for those looking to
        simplify their rental management process. Thank you for considering our
        Rent Management System, and we look forward to helping you manage your
        rental properties with ease.
      </Typography>
      <Typography variant="h6">Contributors To The Project:</Typography>
    </Box>
  );
}

export default AboutPara;

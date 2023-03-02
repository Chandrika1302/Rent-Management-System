import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CustomLink from "../../../components/ui/CustomLink.jsx";
import PropTypes from "prop-types";

export default function TenantCard({ tenant }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
        },
      }}
    >
      <CustomLink to={"/tenants/" + tenant._id}>
        <Paper elevation={3} sx={{ p: 1 }}>
          <Typography variant="h5" component="h3">
            Name: {tenant.name}
          </Typography>

          <Typography
            variant="body2"
            component="h4"
            sx={{ color: "text.secondary" }}
          >
            {
              //Total Tenants: {tenant.tenants.length}
            }
          </Typography>

          <Typography
            variant="h6"
            component="p"
            sx={{ color: "text.primary", mt: 3, mb: 3 }}
          >
            Phone: {tenant.phoneNumber}
          </Typography>
        </Paper>
      </CustomLink>
    </Box>
  );
}
TenantCard.propTypes = {
  tenant: PropTypes.object,
};

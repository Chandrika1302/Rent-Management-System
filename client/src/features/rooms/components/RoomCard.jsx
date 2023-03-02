import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CustomLink from "../../../components/ui/CustomLink.jsx";
import PropTypes from "prop-types";

export default function RoomCard({ room }) {
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
      <CustomLink to={"/rooms/" + room._id}>
        <Paper elevation={3} sx={{ p: 1 }}>
          <Typography variant="h5" component="h3">
            RN: {room.number}
          </Typography>

          <Typography
            variant="body2"
            component="h4"
            sx={{ color: "text.secondary" }}
          >
            Total Tenants: {room.tenants.length}
          </Typography>
          <Typography
            variant="body2"
            component="p"
            sx={{ color: "text.primary", mt: 2, mb: 1 }}
          >
            Occupants:
          </Typography>
          <Grid container>
            {room.tenants.map((tenant) => {
              return (
                <Grid item xs={6} key={tenant._id}>
                  <Typography
                    variant="span"
                    component="p"
                    sx={{ color: "text.secondary", mt: 1, mb: 0 }}
                    key={tenant._id}
                  >
                    {tenant.name}
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
          <Typography
            variant="h6"
            component="p"
            sx={{ color: "text.primary", mt: 3, mb: 3 }}
          >
            Balance: {room.balance}
          </Typography>

          <Typography
            variant="body2"
            component="p"
            sx={{
              color: "text.secondary",
              display: "flex",
              justifyContent: "right",
            }}
          >
            Base Rent: {room.baseRent}
          </Typography>
        </Paper>
      </CustomLink>
    </Box>
  );
}
RoomCard.propTypes = {
  room: PropTypes.object,
};

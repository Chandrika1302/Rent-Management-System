import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";

const backgroundColor = "hsl(221, 0%, 95%);";

export default function Stats({ totalRooms, totalTenants }) {
  return (
    <Box>
      <Typography variant="h5" component="div" sx={{ m: 1, mt: 4 }}>
        Some Stats:
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <Card sx={{ minWidth: 275, backgroundColor }} variant="outlined">
            <CardContent>
              <Typography
                variant="h4"
                component="div"
                sx={{ m: 1, display: "flex", justifyContent: "center" }}
              >
                Total Rooms: {totalRooms}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={6} xs={12}>
          <Card sx={{ minWidth: 275, backgroundColor }} variant="outlined">
            <CardContent>
              <Typography
                variant="h4"
                component="div"
                sx={{ m: 1, display: "flex", justifyContent: "center" }}
              >
                Total Tenants: {totalTenants}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

Stats.propTypes = {
  totalTenants: PropTypes.string,
  totalRooms: PropTypes.string,
};

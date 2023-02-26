import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";

export default function BasicCard() {
  return (
    <Card sx={{ minWidth: 275 }} variant="outlined">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Welcome to
        </Typography>
        <Typography variant="h3" component="div">
          RMS{" "}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          a React+Redux Application with express backend
        </Typography>
        <Typography variant="body2">
          RMS, short for Rent Management System is a project made to demonstrate
          application of react+redux with MUI and express as backend.
          <br />
          Visit the pages linked in the header to find more about the features
          of this application.
        </Typography>
      </CardContent>
      <CardActions>
        <Link href="https://www.github.com/prince-thind/cse445" target="_blank">
          Source Code
        </Link>
      </CardActions>
    </Card>
  );
}

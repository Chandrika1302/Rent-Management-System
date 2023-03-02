import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Layout from "./Layout";
import CardActions from "@mui/material/CardActions";
import { Link } from "@mui/material";
import PropTypes from "prop-types";

export default function ErrorPage({ message = "Unknown Error Occured" }) {
  return (
    <Layout>
      <Card sx={{ minWidth: 275 }} variant="outlined">
        <CardContent>
          <Typography variant="h3" component="div">
            {message}
          </Typography>
        </CardContent>{" "}
        <CardActions>
          <Link href="/">Back To Homepage</Link>
        </CardActions>
      </Card>
    </Layout>
  );
}
ErrorPage.propTypes = {
  message: PropTypes.string,
};

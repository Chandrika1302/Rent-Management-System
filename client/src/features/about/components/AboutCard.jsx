import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";

export default function AboutCard({ about }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
        },
        flex: 1,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 1,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          backgroundColor: "hsl(221, 0%, 95%);",
          boxShadow: "0 0 0.5rem 0.1rem gray",
        }}
      >
        <Typography variant="h5" component="h3">
          Name: {about.name}
        </Typography>

        <Typography
          variant="body2"
          component="h4"
          sx={{ color: "text.secondary" }}
        >
          {about.intro}
        </Typography>

        <Typography
          variant="p"
          component="p"
          sx={{
            color: "text.primary",
            mt: 3,
            mb: 3,
          }}
        >
          {about.contribution}
        </Typography>
      </Paper>
    </Box>
  );
}
AboutCard.propTypes = {
  about: PropTypes.object,
};

import Grid from "@mui/material/Grid";
import Grow from "@mui/material/Grow";
import Box from "@mui/material/Box";
import AboutCard from "./components/AboutCard";
import users from "./misc/users.js";
import AboutPara from "./components/AboutPara";

function About() {
  const abouts = users;

  return (
    <Grow in>
      <Box>
        <AboutPara />
        <Grid container spacing={2}>
          {abouts.map((about, index) => {
            return (
              <Grid
                item
                xs={12}
                md={4}
                lg={3}
                key={index}
                sx={{ display: "flex" }}
              >
                <AboutCard about={about} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Grow>
  );
}

export default About;

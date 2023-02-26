import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grow from "@mui/material/Grow";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import fetchRoom from "../utils/fetchRoom.js";
import { selectToken } from "../../user/userSlice.js";
import CustomLink from "../../../components/ui/CustomLink.jsx";

function Room() {
  const id = useParams().id;
  const navigate = useNavigate();
  const [room, setRoom] = useState({});
  const [fetching, setFetching] = useState(true);
  const token = useSelector(selectToken);

  useEffect(() => {
    const asyncRoomFetch = async () => {
      setFetching(true);
      const { room } = await fetchRoom({ token, id });
      setRoom(room);
      setFetching(false);
    };
    asyncRoomFetch();
  }, [id, token]);

  //TODO bad hack, error checking is horribly complex and proabably broken
  if (Object.keys(room).length == 0 && !fetching) {
    return (
      <Typography variant="h2" component="h2">
        No Room Found
      </Typography>
    );
  }
  if (fetching) {
    return (
      <Typography variant="h2" component="h2">
        Loading...
      </Typography>
    );
  }

  return (
    <Grow in>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
          },
        }}
      >
        <Paper elevation={2} sx={{ p: 1, width: 1 }}>
          <Typography variant="h5" component="h3">
            RN: {room.roomNumber}
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
            sx={{ color: "text.primary", mt: 2, mb: 0 }}
          >
            Occupants:
          </Typography>
          <Grid container>
            {room.tenants.map((tenant) => {
              return (
                <Grid item xs={12} key={tenant._id}>
                  <Typography
                    variant="h6"
                    component="p"
                    sx={{ color: "text.secondary", ml: 4, mt: 1, mb: 1 }}
                    key={tenant._id}
                  >
                    <CustomLink to={"/tenants/" + tenant._id} color="primary">
                      {tenant.name}
                    </CustomLink>
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
          <Typography
            variant="h6"
            component="p"
            sx={{ color: "text.primary", mt: 1, mb: 1 }}
          >
            Balance: {room.balance}
          </Typography>

          <Typography
            variant="body2"
            component="p"
            sx={{
              color: "text.secondary",
              display: "flex",
              justifyContent: "left",
            }}
          >
            Base Rent: {room.baseRent}
          </Typography>
        </Paper>
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/rooms/update/" + room._id);
          }}
        >
          Update
        </Button>{" "}
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/rooms/delete/" + room._id);
          }}
        >
          delete
        </Button>
      </Box>
    </Grow>
  );
}

export default Room;

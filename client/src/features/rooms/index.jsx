import Grid from "@mui/material/Grid";
import Grow from "@mui/material/Grow";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import RoomCard from "./components/RoomCard";
import { selectToken } from "../user/userSlice.js";
import apiFetch from "../../lib/apiFetch";
import { showErrorToast } from "../../components/ui/toasts";

function AllRooms() {
  const [rooms, setRooms] = useState([]);
  const [fetching, setFetching] = useState(true);
  const token = useSelector(selectToken);

  useEffect(() => {
    const asyncRoomFetch = async () => {
      setFetching(true);
      const roomsRaw = await apiFetch("/api/rooms/", { token });
      const rooms = roomsRaw.data?.rooms;
      const error = roomsRaw.error?.message;
      if (error) {
        showErrorToast(error);
      }

      setRooms(rooms);
      setFetching(false);
    };
    asyncRoomFetch();
  }, []);

  if (rooms.length === 0 && fetching == false) {
    return (
      <Typography variant="h2" component="h2">
        No room Found
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
      <Grid container spacing={2}>
        {rooms.map((room) => {
          return (
            <Grid item xs={12} md={4} lg={3} key={room._id}>
              <RoomCard room={room} />
            </Grid>
          );
        })}
      </Grid>
    </Grow>
  );
}

export default AllRooms;

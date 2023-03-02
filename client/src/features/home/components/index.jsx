import DashBoardCard from "./DashboardCard";
import Stats from "./Stats";
import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import apiFetch from "../../../lib/apiFetch";
import { selectToken } from "../../user/userSlice.js";

function Home() {
  const token = useSelector(selectToken);
  const [totalRooms, setTotalRooms] = useState("loading...");
  const [totalTenants, setTotalTenants] = useState("loading...");

  useEffect(() => {
    fetchStuff();
    async function fetchStuff() {
      const roomsRaw = await apiFetch("/api/rooms", { token });
      const rooms = roomsRaw.data.rooms;
      const tenantsRaw = await apiFetch("/api/tenants", { token });
      const tenants = tenantsRaw.data.tenants;

      setTotalRooms(rooms.length + "");
      setTotalTenants(tenants.length + "");
    }
  }, []);
  return (
    <Grow in>
      <Box>
        <DashBoardCard />
        <Stats totalRooms={totalRooms} totalTenants={totalTenants} />
      </Box>
    </Grow>
  );
}

export default Home;

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grow from "@mui/material/Grow";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { selectToken } from "../../user/userSlice.js";
import apiFetch from "../../../lib/apiFetch.js";
import deleteTenant from "../utils/deleteTenant.js";

function Tenant() {
  const id = useParams().id;
  const navigate = useNavigate();
  const [tenant, setTenant] = useState({});
  const [fetching, setFetching] = useState(true);
  const token = useSelector(selectToken);

  useEffect(() => {
    const asyncTenantFetch = async () => {
      setFetching(true);
      const tenantRaw = await apiFetch("/api/tenants/" + id, { token });
      const tenant = tenantRaw.data?.tenant;
      const error = tenantRaw.error?.message;
      if (error) {
        console.error(error);
      }
      setTenant(tenant);
      setFetching(false);
    };
    asyncTenantFetch();
  }, [id, token]);

  if (tenant == null && !fetching) {
    return (
      <Typography variant="h2" component="h2">
        No Tenant Found
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
            Name: {tenant.name}
          </Typography>
          <Typography
            variant="body2"
            component="h4"
            sx={{ color: "text.secondary" }}
          >
            Room Number:
            {tenant.room.number}
          </Typography>
          <Typography
            variant="body2"
            component="p"
            sx={{ color: "text.primary", mt: 2, mb: 0 }}
          >
            Personal Information:
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{ color: "text.secondary", ml: 4, mt: 1, mb: 1 }}
          >
            Phone: {tenant.phoneNumber}
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{ color: "text.secondary", ml: 4, mt: 1, mb: 1 }}
          >
            Aadhar Card Number: {tenant.aadharCard}
          </Typography>{" "}
          <Typography
            variant="h6"
            component="p"
            sx={{ color: "text.secondary", ml: 4, mt: 1, mb: 1 }}
          >
            Address: {tenant.address}
          </Typography>
        </Paper>
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/rooms/" + tenant.room._id);
          }}
        >
          Visit Room
        </Button>{" "}
        <Button
          variant="outlined"
          onClick={() => {
            deleteTenant(tenant._id, navigate, token);
          }}
        >
          delete
        </Button>
      </Box>
    </Grow>
  );
}

export default Tenant;

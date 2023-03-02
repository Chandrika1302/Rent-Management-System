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
import CustomLink from "../../../components/ui/CustomLink.jsx";
import apiFetch from "../../../lib/apiFetch.js";

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
            variant="h4"
            component="p"
            sx={{ color: "text.primary", mt: 2, mb: 0 }}
          >
            Room:{" "}
            <CustomLink to={"/rooms/" + tenant.room._id} color="primary">
              {tenant.room.number}
            </CustomLink>
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{ color: "text.primary", mt: 1, mb: 1 }}
          >
            Phone: {tenant.phoneNumber}
          </Typography>
          <Typography
            variant="body2"
            component="p"
            sx={{
              color: "text.secondary",
              mt: 1,
            }}
          >
            Aadhar Card Number: {tenant.aadharCard}
          </Typography>{" "}
          <Typography variant="h6" component="p" sx={{ mt: 3 }}>
            Address: {tenant.address}
          </Typography>
        </Paper>
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/tenants/update/" + tenant._id);
          }}
        >
          Update
        </Button>{" "}
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/tenants/delete/" + tenant._id);
          }}
        >
          delete
        </Button>
      </Box>
    </Grow>
  );
}

export default Tenant;

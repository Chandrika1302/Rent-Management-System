import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";
import Typography from "@mui/material/Typography";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { selectToken } from "../user/userSlice.js";
import apiFetch from "../../lib/apiFetch";
import { showErrorToast } from "../../components/ui/toasts";
import CustomLink from "../../components/ui/CustomLink";

function AllTenants() {
  const [tenants, setTenants] = useState([]);
  const [fetching, setFetching] = useState(true);
  const token = useSelector(selectToken);

  useEffect(() => {
    const asyncTenantFetch = async () => {
      setFetching(true);
      const tenantsRaw = await apiFetch("/api/tenants/", { token });
      const tenants = tenantsRaw.data?.tenants;
      const error = tenantsRaw.error?.message;
      if (error) {
        showErrorToast(error);
      }
      setTenants(tenants);
      setFetching(false);
    };
    asyncTenantFetch();
  }, []);

  if (tenants.length === 0 && fetching == false) {
    return (
      <Typography variant="h2" component="h2">
        No tenant Found
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
      <Box>
        <Paper elevation={2} sx={{ p: 1, width: 1 }}>
          <Typography variant="h5" component="h3">
            Full List of Tenants:
          </Typography>
          <Grid container>
            {tenants.map((tenant) => {
              return (
                <Grid item xs={12} key={tenant._id}>
                  <Typography
                    variant="h6"
                    component="p"
                    sx={{ color: "text.secondary", ml: 4, mt: 1, mb: 1 }}
                    key={tenant._id}
                  >
                    <CustomLink to={"/tenants/" + tenant._id} color="primary">
                      {tenant.name},
                    </CustomLink>
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
        </Paper>
      </Box>
    </Grow>
  );
}

export default AllTenants;

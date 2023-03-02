import Grid from "@mui/material/Grid";
import Grow from "@mui/material/Grow";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import TenantCard from "./components/TenantCard";
import { selectToken } from "../user/userSlice.js";
import apiFetch from "../../lib/apiFetch";
import { showErrorToast } from "../../components/ui/toasts";

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
      <Grid container spacing={2}>
        {tenants.map((tenant) => {
          return (
            <Grid item xs={3} key={tenant._id}>
              <TenantCard tenant={tenant} />
            </Grid>
          );
        })}
      </Grid>
    </Grow>
  );
}

export default AllTenants;

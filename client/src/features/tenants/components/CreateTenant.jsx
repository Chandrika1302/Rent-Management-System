import Form from "../../../components/form/Form";
import createTenant from "../utils/createTenant.js";

import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grow from "@mui/material/Grow";

import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  showErrorToast,
  showSuccessToast,
} from "../../../components/ui/toasts.js";
import { selectToken } from "../../user/userSlice";

export default function CreateTenant() {
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const [loading, setLoading] = useState(false);

  const fields = {
    tenantNumber: {
      placeHolder: "Tenant Number",
      required: true,
      type: "text",
      value: "",
    },
    baseRent: {
      placeHolder: "Base Rent",
      required: true,
      type: "text",
      value: "2000",
    },
  };

  async function onSubmit(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const tenantNumber = formData.tenantNumber;
    const baseRent = formData.baseRent;

    setLoading(true);
    const { error } = await createTenant({ baseRent, tenantNumber, token });

    if (!error) {
      navigate("/tenants");
      showSuccessToast("Tenant Created");
    } else {
      showErrorToast("Unknown Error Occured");
    }
    setLoading(false);
  }

  return (
    <Grow in>
      <Box>
        <Typography
          variant="h4"
          component="h3"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          Create Tenant
        </Typography>
        <Form fields={fields} onSubmit={onSubmit} loading={loading} />
      </Box>
    </Grow>
  );
}

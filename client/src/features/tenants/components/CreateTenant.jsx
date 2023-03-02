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
    name: {
      placeHolder: "Name of the Occupant",
      required: true,
      type: "text",
      value: "",
    },
    phoneNumber: {
      placeHolder: "Phone Number",
      required: true,
      type: "number",
      value: "",
    },
    aadharCard: {
      placeHolder: "Aadhar Card Number",
      required: true,
      type: "number",
      value: "",
    },
    room: {
      placeHolder: "Room Number",
      required: true,
      type: "number",
      value: "",
    },
  };

  async function onSubmit(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const name = formData.name;
    const phoneNumber = formData.phoneNumber;
    const aadharCard = formData.aadharCard;
    const room = formData.room;
    setLoading(true);
    const res = await createTenant({
      name,
      phoneNumber,
      aadharCard,
      room,
      token,
    });

    const error = res.error;
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

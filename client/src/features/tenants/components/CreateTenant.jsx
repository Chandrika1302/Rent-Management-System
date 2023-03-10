import Form from "../../../components/form/Form";

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
import apiFetch from "../../../lib/apiFetch";

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
    address: {
      placeHolder: "Address",
      required: true,
      type: "textarea",
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
    const address = formData.address;
    setLoading(true);
    const res = await apiFetch("/api/tenants/create", {
      body: {
        name,
        phoneNumber,
        aadharCard,
        room,
        address,
      },
      token,
      method: "POST",
    });

    const tenant = res.data?.tenant;
    if (tenant) {
      navigate("/tenants/" + tenant._id);
      showSuccessToast("Tenant Created");
    } else {
      const error = res.error?.message;
      showErrorToast(error);
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

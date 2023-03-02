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

export default function CreateRoom() {
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const [loading, setLoading] = useState(false);

  const fields = {
    roomNumber: {
      placeHolder: "Room Number",
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
    const roomNumber = formData.roomNumber;
    const baseRent = formData.baseRent;

    setLoading(true);
    const res = await apiFetch("/api/rooms/create", {
      body: {
        number: roomNumber,
        baseRent,
      },
      token,
      method: "POST",
    });
    const room = res.data?.room;
    if (room) {
      navigate(`/rooms/${room._id}`);
      showSuccessToast("Room Created");
    } else {
      showErrorToast(res.error?.message);
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
          Create Room
        </Typography>
        <Form fields={fields} onSubmit={onSubmit} loading={loading} />
      </Box>
    </Grow>
  );
}

import Form from "../../../components/form/Form";

import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grow from "@mui/material/Grow";

import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  showErrorToast,
  showSuccessToast,
} from "../../../components/ui/toasts.js";
import { selectToken } from "../../user/userSlice";
import apiFetch from "../../../lib/apiFetch";

export default function CreateTransaction() {
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const roomNumber = searchParams.get("roomNumber");
  const fields = {
    room: {
      placeHolder: "Room Number",
      required: true,
      type: "text",
      value: roomNumber,
    },
    transfer: {
      placeHolder: "Money Transferred",
      required: true,
      type: "text",
      value: "",
    },
    remarks: {
      placeHolder: "Remarks",
      type: "text",
      value: "",
    },
  };

  async function onSubmit(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const transfer = formData.transfer;
    const remarks = formData.remarks;
    const room = formData.room;
    setLoading(true);
    const res = await apiFetch("/api/transactions/create", {
      body: {
        transfer,
        remarks,
        room,
        token,
      },
      token,
      method: "POST",
    });

    const transaction = res.data?.transaction;
    if (transaction) {
      navigate("/transactions/" + transaction._id);
      showSuccessToast("Transaction Created");
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
          Create Transaction
        </Typography>
        <Form fields={fields} onSubmit={onSubmit} loading={loading} />
      </Box>
    </Grow>
  );
}

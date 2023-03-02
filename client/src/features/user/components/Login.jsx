import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Form from "../../../components/form/Form";

import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grow from "@mui/material/Grow";
import { login } from "../userSlice";
import { useState } from "react";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../components/ui/toasts.js";
import apiFetch from "../../../lib/apiFetch";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const fields = {
    username: {
      placeHolder: "Your Username",
      required: true,
      type: "text",
      value: "",
    },
    password: {
      placeHolder: "Your Password",
      required: true,
      type: "password",
      value: "",
    },
  };

  async function onSubmit(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const username = formData.username;
    const password = formData.password;

    setLoading(true);
    const res = await apiFetch("/api/login", {
      body: { username, password },
      method: "POST",
    });

    if (res.data?.token) {
      dispatch(login({ name: username, token: res.data.token }));
      navigate("/");
      showSuccessToast("Logged in Successfully");
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
          Login
        </Typography>
        <Form fields={fields} onSubmit={onSubmit} loading={loading} />;
      </Box>
    </Grow>
  );
}

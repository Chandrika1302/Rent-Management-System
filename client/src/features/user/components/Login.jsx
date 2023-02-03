import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Form from "../../../components/form/Form";

import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grow from "@mui/material/Grow";
import validateLogin from "../utils/validateLogin";
import { login } from "../userSlice";
import { useState } from "react";
import { showErrorToast, showSuccessToast } from "../utils/toasts";

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
    const isUserValid = await validateLogin({
      username: username,
      password: password,
    });

    if (isUserValid) {
      dispatch(login({ name: username })); //TODO handle token too
      navigate("/");
      showSuccessToast();
    } else {
      showErrorToast();
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

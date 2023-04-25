import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../userSlice";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";

import { selectUserName, selectToken } from "../userSlice";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../components/ui/toasts";
import apiFetch from "../../../lib/apiFetch";

export default function Signout() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserName);
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <div>
      <Typography variant="h6" sx={{ mb: 2 }}>
        This will delete all the rooms, tenants and other associated data with
        your account. This action is irreversible.
      </Typography>

      <Button
        variant="outlined"
        color="error"
        onClick={() => {
          deleteUser(user, navigate, token);
        }}
      >
        Are you Sure you want to Delete {user}?
      </Button>
    </div>
  );

  async function deleteUser() {
    const res = await apiFetch("/api/signout/", {
      method: "delete",
      token,
    });
    if (res.error == null) {
      navigate("/");
      dispatch(logout());

      showSuccessToast("User successfully deleted");
    } else {
      showErrorToast(res.error.message);
    }
  }
}

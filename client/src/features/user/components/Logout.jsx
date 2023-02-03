import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout } from "../userSlice";

export default function Logout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout());
  }, []);

  return (
    <div>
      logging out...
      <Navigate to="/login" />
    </div>
  );
}

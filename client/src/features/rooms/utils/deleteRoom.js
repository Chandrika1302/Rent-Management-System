import {
  showErrorToast,
  showSuccessToast,
} from "../../../components/ui/toasts";
import apiFetch from "../../../lib/apiFetch";

export default async function deleteRoom(id, navigate, token) {
  const res = await apiFetch("/api/rooms/" + id, {
    method: "delete",
    token,
  });
  if (res.error == null) {
    navigate("/rooms/");
    showSuccessToast("Room successfully deleted");
  } else {
    showErrorToast(res.error.message);
  }
}

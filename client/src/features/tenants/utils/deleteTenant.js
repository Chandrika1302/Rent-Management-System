import {
  showErrorToast,
  showSuccessToast,
} from "../../../components/ui/toasts";
import apiFetch from "../../../lib/apiFetch";

export default async function deleteTenant(id, navigate, token) {
  const res = await apiFetch("/api/tenants/" + id, {
    method: "delete",
    token,
  });
  if (res.error == null) {
    navigate("/rooms");
    showSuccessToast("Tenant successfully deleted");
  } else {
    showErrorToast(res.error.message);
  }
}

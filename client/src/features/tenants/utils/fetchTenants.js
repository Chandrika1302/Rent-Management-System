import apiFetch from "../../../lib/apiFetch";

export default async function fetchTenants({ token }) {
  const res = await apiFetch("/api/tenants/", {
    token,
  });

  return { tenants: res, error: res.error };
}

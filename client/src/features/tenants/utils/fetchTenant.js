import apiFetch from "../../../lib/apiFetch";

export default async function fetchTenant({ token, id }) {
  const res = await apiFetch("/api/tenants/" + id, {
    token,
  });

  return { tenant: res, error: res.error };
}

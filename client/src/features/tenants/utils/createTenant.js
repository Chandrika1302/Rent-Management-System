import apiFetch from "../../../lib/apiFetch";

export default async function createTenant({
  name,
  phoneNumber,
  aadharCard,
  room,
  token,
}) {
  const res = await apiFetch("/api/tenants/create", {
    token,
    body: {
      name,
      phoneNumber,
      aadharCard,
      room,
    },
  });

  return { error: res.error };
}

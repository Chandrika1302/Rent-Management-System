import apiFetch from "../../../lib/apiFetch";

export default async function createTenant({ tenantNumber, baseRent, token }) {
  const res = await apiFetch("/api/tenants/create", {
    body: {
      tenantNumber,
      baseRent,
    },
    token,
  });

  return { error: res.error };
}

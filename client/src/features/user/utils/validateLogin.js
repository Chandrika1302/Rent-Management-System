import apiFetch from "../../../lib/apiFetch";

export default async function validateLogin({ username, password }) {
  const res = await apiFetch("/api/login", {
    body: {
      username,
      password,
    },
  });

  if (res.error != undefined) {
    return { error: res.error };
  }
  return { token: res.token };
}

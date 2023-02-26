import apiFetch from "../../../lib/apiFetch";

export default async function fetchRoom({ token, id }) {
  const res = await apiFetch("/api/rooms/" + id, {
    token,
  });

  return { room: res, error: res.error };
}

import apiFetch from "../../../lib/apiFetch";

export default async function fetchRooms({ token }) {
  const res = await apiFetch("/api/rooms/", {
    token,
  });

  return { rooms: res, error: res.error };
}

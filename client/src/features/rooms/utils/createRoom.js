import apiFetch from "../../../lib/apiFetch";

export default async function createRoom({ roomNumber, baseRent, token }) {
  const res = await apiFetch("/api/rooms/create", {
    body: {
      roomNumber,
      baseRent,
    },
    token,
  });

  return { error: res.error };
}

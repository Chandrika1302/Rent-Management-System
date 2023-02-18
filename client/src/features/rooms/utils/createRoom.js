import apiFetch from "../../../lib/apiFetch";

export default async function createRoom({ rooomNumber, baseRent }) {
	const res = await apiFetch("/api/rooms/create", {
		body: {
			rooomNumber,
			baseRent,
		},
	});

	return { error: res.error };
}

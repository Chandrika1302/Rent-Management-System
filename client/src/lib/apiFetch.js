const origin = ""; //origin is same for deployment, for development it's proxied in vite config

export default async function apiFetch(path, props) {
  try {
    const res = await fetch(origin + path, {
      method: props.method ?? "GET",
      headers: {
        Authorization: `Bearer ${props.token ?? ""}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.body),
    });

    try {
      return await res.json();
    } catch (e) {
      return { error: { code: e.code, message: "Invalid JSON from server" } };
    }
  } catch (e) {
    console.error(e);
    return { error: { code: e.code, message: e.message } };
  }
}

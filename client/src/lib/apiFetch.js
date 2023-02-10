const origin = ""; //origin is same for deployment, for development it's proxied in vite config

export default async function apiFetch(path, props) {
  try {
    const res = await fetch(origin + path, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${props.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.body),
    });

    try {
      return await res.json();
    } catch (e) {
      return { error: "response not a json" };
    }
  } catch (e) {
    console.error(e);
    return { error: e };
  }
}

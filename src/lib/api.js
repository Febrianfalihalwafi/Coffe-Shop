export const API_URL = "http://localhost:5000/api";

export const apiFetch = async (endpoint, method, body) => {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return res.json();
  } catch (err) {
    console.error(err);
    return { message: "Network error" };
  }
};
const baseURL = "http://localhost:3001";

// Function to check if the response is OK
export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
};

// Generalized request function
function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

// Fetch all items (GET /items)
export const getItems = () => {
  return request(`${baseURL}/items`);
};

// Add a new item (POST /items)
export const addItem = (item) => {
  return request(`${baseURL}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
};

// Remove an item (DELETE /items/:id)
export const removeItem = (id) => {
  return request(`${baseURL}/items/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
};

// Export all functions
const api = { getItems, addItem, removeItem };
export default api;

//register/
export const register = async ({ name, avatar, email, password }) => {
  const res = await fetch("/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  });
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }
  return await res.json();
};

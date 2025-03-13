const baseURL = "http://localhost:3001";

// Fetch all items (GET /items)
export const getItems = () => {
  return fetch(`${baseURL}/items`)
    .then((res) => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
};

// Add a new item (POST /items)
export const addItem = (name, imageUrl, weather) => {
  return fetch(`${baseURL}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then((res) => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
};

// Remove an item (DELETE /items/:id)
export const removeItem = (id) => {
  return fetch(`${baseURL}/items/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
};

// Export all functions
const api = { getItems, addItem, removeItem };
export default api;

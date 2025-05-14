export const baseURL = "http://localhost:3001";

// Check response status and parse JSON or reject
export const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

// General request function
function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

// Get all items
export const getItems = () => {
  return request(`${baseURL}/items`);
};

// Add a new item
export const addItem = (item) => {
  const token = localStorage.getItem("jwt");
  return request(`${baseURL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });
};

// Delete an item
export const removeItem = (id) => {
  const token = localStorage.getItem("jwt");
  return request(`${baseURL}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

// Save updated user profile
export const handleSaveProfile = (updatedUserData) => {
  console.log("sending updated user data:", updatedUserData);
  const token = localStorage.getItem("jwt");
  return request(`${baseURL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedUserData),
  });
};

// Like a card
export const addCardLike = (id, token) => {
  return request(`${baseURL}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

// Unlike a card
export const removeCardLike = (id, token) => {
  return request(`${baseURL}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

// Export all as default object 
const api = {
  getItems,
  addItem,
  removeItem,
  handleSaveProfile,
  addCardLike,
  removeCardLike,
};

export default api;

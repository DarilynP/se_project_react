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
  const token = localStorage.getItem("jwt");
  console.log("token:", token);
  return request(`${baseURL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });
};

// Remove an item (DELETE /items/:id)
export const removeItem = (id) => {
  const token = localStorage.getItem("jwt"); // Get the token from local storage

  return request(`${baseURL}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Add the token here
    },
  });
};

// Export all functions
const api = { getItems, addItem, removeItem };
export default api;

//register/
export const register = async ({ name, avatar, email, password }) => {
  const res = await fetch(`${baseURL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  });
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }
  return await res.json();
};

//login
export const login = ({ email, password }) => {
  return fetch(`${baseURL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

//token
export const checkToken = (token) => {
  return fetch(`${baseURL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

// Handle saving the updated user data
export const handleSaveProfile = (updatedUserData) => {
  fetch(`http://localhost:3001/users/me`, {
    method: "PATCH",
    body: JSON.stringify(updatedUserData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error updating profile:", error);
      alert("Something went wrong while updating your profile.");
    });
};

export const handleDelete = (itemId) => {
  const token = localStorage.getItem("jwt");

  fetch(`${baseURL}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to delete item");
      }
      return res.json(); // optional, only if your backend sends JSON back
    })
    .catch((error) => {
      console.error("Error deleting item:", error);
      alert("Failed to delete the item.");
    });
};

export const addCardLike = (id, token) => {
  return fetch(`${baseURL}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to like the card");
    }
    return res.json();
  });
};

export const removeCardLike = (id, token) => {
  return fetch(`${baseURL}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to unlike the card");
    }
    return res.json();
  });
};

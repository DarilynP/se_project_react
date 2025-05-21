import { checkResponse } from "./api";

import { baseURL } from './config';

export const baseUrl = process.env.NODE_ENV === "production" 
  ? "https://api.devdarilyn.ignorelist.com"
  : "http://localhost:3001";

// Register user
export const register = ({ name, avatar, email, password }) => {
  return fetch(`${baseURL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);
};

// Login user
export const login = ({ email, password }) => {
  return fetch(`${baseURL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

// Verify token
export const checkToken = (token) => {
  return fetch(`${baseURL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

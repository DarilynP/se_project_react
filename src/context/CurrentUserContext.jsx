// src/context/CurrentUserContext.jsx
import React, { createContext, useState, useEffect } from "react";

const CurrentUserContext = createContext();

export function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Fetch the current user data on component mount
    fetch("/api/currentUser")
      .then((res) => res.json())
      .then((data) => setCurrentUser(data));
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export default CurrentUserContext;

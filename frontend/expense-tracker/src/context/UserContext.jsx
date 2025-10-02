import React, { createContext, useState } from "react";

// Tạo context
export const UserContext = createContext();

// Provider component
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Update user data (sau login)
  const updateUser = (userData) => {
    setUser(userData);
  };

  // Clear User data (logout)
  const clearUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

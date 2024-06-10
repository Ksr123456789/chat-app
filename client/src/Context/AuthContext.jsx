import { createContext, useContext, useState } from "react";

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(
    JSON.parse(localStorage.getItem("userDetails")) || null
  );
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  return (
    <AuthContext.Provider value={{ authenticatedUser, setAuthenticatedUser, selectedUser, setSelectedUser,messages, setMessages }}>
      {children}
    </AuthContext.Provider>
  );
};

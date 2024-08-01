// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { useSDK } from "@metamask/sdk-react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const { sdk, connected, connecting, chainId } = useSDK();


  const login = (provider) => {
    setProvider(provider);
    console.log("Provider set!")
  };

  const logout = () => {
    setProvider(null);
     sdk?.disconnect();

  };

  return (
    <AuthContext.Provider value={{ provider, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

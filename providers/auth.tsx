"use client";

import { useToast } from "@chakra-ui/react";
import React, { createContext, useState } from "react";

interface AuthContextTypes {
  isOk: boolean;
  setIsOk: (password: string) => void;
}

export const AuthContext = createContext<AuthContextTypes | undefined>(
  undefined
);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const toast = useToast();
  const [password, setPassword] = useState(false);
  const confirmUser = (password: string) => {
    if (password !== "hawarhekmat") {
      toast({
        title: "Error",
        description: "Incorrect password.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }
    setPassword(true);
  };
  return (
    <AuthContext.Provider
      value={{
        isOk: password,
        setIsOk: confirmUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

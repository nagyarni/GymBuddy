// SnackbarContext.js
import React, { createContext, useContext, useState } from 'react';

const SnackbarContext = createContext();

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
  const [snackbarMessage, setSnackbarMessage] = useState({ message: "", isError: false });

  return (
    <SnackbarContext.Provider value={{ snackbarMessage, setSnackbarMessage }}>
      {children}
    </SnackbarContext.Provider>
  );
};

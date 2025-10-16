import { createContext, useContext, useState } from "react";

const LoadingStatusContext = createContext();

export function LoadingStatusProvider({ children }) {
  const [loadingStatus, setLoadingStatus] = useState(false);

  const updateLoadingStatus = (newValue) => {
    setLoadingStatus(Boolean(newValue));
  };

  return (
    <LoadingStatusContext.Provider
      value={{ loadingStatus, updateLoadingStatus }}
    >
      {children}
    </LoadingStatusContext.Provider>
  );
}

export function useLoadingStatus() {
  return useContext(LoadingStatusContext);
}

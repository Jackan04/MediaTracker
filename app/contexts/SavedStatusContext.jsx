import { createContext, useContext, useState } from "react";

const SavedStatusContext = createContext();

export function SavedStatusProvider({ children }) {
  const [savedStatus, setSavedStatus] = useState({});

  const updateSavedStatus = (tmdb_id, status) =>
    setSavedStatus((prev) => ({ ...prev, [tmdb_id]: status }));

  return (
    <SavedStatusContext.Provider value={{ savedStatus, updateSavedStatus }}>
      {children}
    </SavedStatusContext.Provider>
  );
}

export function useSavedStatus() {
  return useContext(SavedStatusContext);
}

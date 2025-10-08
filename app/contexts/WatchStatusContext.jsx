import { createContext, useContext, useState } from "react";

const WatchStatusContext = createContext();

export function WatchStatusProvider({ children }) {
  const [watchStatus, setWatchStatus] = useState({}) // Stored as a kvp object, tmdb_id and the watch status for that id

  const updateWatchStatus = (tmdb_id, isWatched) => {
    setWatchStatus((prev) => ({ ...prev, [tmdb_id]: isWatched }));
  };

  return (
    <WatchStatusContext.Provider value={{ watchStatus, updateWatchStatus }}>
      {children}
    </WatchStatusContext.Provider>
  );
}

export function useWatchStatus() {
  return useContext(WatchStatusContext);
}

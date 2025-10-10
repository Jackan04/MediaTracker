import { createContext, useContext, useState } from "react";

const PinnedStatusContext = createContext();

export function PinnedStatusProvider({ children }) {
  const [pinnedStatus, setPinnedStatus] = useState({}); // Stored as a kvp object, tmdb_id and the watch status for that id

  const updatePinnedStatus = (tmdb_id, isPinned) => {
    setPinnedStatus((prev) => ({ ...prev, [tmdb_id]: isPinned }));
  };

  return (
    <PinnedStatusContext.Provider value={{ pinnedStatus, updatePinnedStatus }}>
      {children}
    </PinnedStatusContext.Provider>
  );
}

export function usePinnedStatus() {
  return useContext(PinnedStatusContext);
}

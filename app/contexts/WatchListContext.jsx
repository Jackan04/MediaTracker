import { createContext, useContext, useState } from "react";

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const [refreshToken, setRefreshToken] = useState(0);

  const refreshWatchList = () => setRefreshToken((t) => t + 1);

  return (
    <WatchlistContext.Provider value={{ refreshToken, refreshWatchList }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  return useContext(WatchlistContext);
}

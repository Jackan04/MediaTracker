import { createContext, useContext, useState } from "react";

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const [refreshToken, setRefreshToken] = useState(0);

  // Increment token to trigger automatic re-renders in any component that depends on it (like with useEffect)
  const refreshWatchList = () => setRefreshToken(refreshToken + 1);
  return (
    <WatchlistContext.Provider value={{ refreshToken, refreshWatchList }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  return useContext(WatchlistContext);
}

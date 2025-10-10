import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { SavedStatusProvider } from "./contexts/SavedStatusContext";
import { WatchlistProvider } from "./contexts/WatchListContext";
import { WatchStatusProvider } from "./contexts/WatchStatusContext";
import { PinnedStatusProvider } from "./contexts/PinnedStatusContext";

export default function RootLayout() {
  const [loaded] = useFonts({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
  });

  if (!loaded) return null;

  return (
    <WatchlistProvider>
      <WatchStatusProvider>
        <SavedStatusProvider>
          <PinnedStatusProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="DetailScreen" />
            </Stack>
          </PinnedStatusProvider>
        </SavedStatusProvider>
      </WatchStatusProvider>
    </WatchlistProvider>
  );
}

import { Stack } from "expo-router";
import { useFonts } from 'expo-font';

export default function RootLayout() {
   const [loaded] = useFonts({
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
  });

  if (!loaded) return null;

  return <Stack />;
}

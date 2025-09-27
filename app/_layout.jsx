import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';

export default function RootLayout() {
   const [loaded] = useFonts({
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
  });

  if (!loaded) return null;

  return (
  
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon sf="house.fill" drawable="ic_home" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="MovieScreen">
        <Icon sf="film" drawable="ic_movie" />
        <Label>Movies</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="ShowScreen">
        <Icon sf="tv" drawable="ic_tv" />
        <Label>Shows</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="SearchScreen">
        <Icon sf="magnifyingglass" drawable="ic_search" />
        <Label>Search</Label>
      </NativeTabs.Trigger>
    </NativeTabs>


  // <Stack />

);
}

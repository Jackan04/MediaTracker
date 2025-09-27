import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
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
  );
}

import { Linking } from "react-native";

export const OpenUrl = (url) => {
  return async () => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error("Failed to open URL:", error);
    }
  };
};

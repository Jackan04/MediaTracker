import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS, SIZES } from "../../utils/theme";

export default function Button(props) {
  const handlePress = () => {

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    if (props.onPress) {
      props.onPress();
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[
        styles.button,
        { backgroundColor: props.buttonBgColor || COLORS.blueLight },
      ]}
    >
      <View style={styles.buttonContent}>
        {props.icon && (
          <Ionicons
            name={props.icon}
            size={SIZES.sm}
            color={props.iconColor || props.buttonTextColor || COLORS.blueDark}
            style={styles.icon}
          />
        )}
        {props.text && (
          <Text
            style={[
              styles.buttonText,
              { color: props.buttonTextColor || COLORS.blueDark },
            ]}
          >
            {props.text}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SIZES.buttonVertical,
    paddingHorizontal: SIZES.buttonHorizontal,
    borderRadius: SIZES.radius,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SIZES.xs,
  },
  buttonText: {
    fontWeight: "500",
  },
});

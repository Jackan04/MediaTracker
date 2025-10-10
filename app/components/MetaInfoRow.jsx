import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, FONT_SIZES, SIZES } from "../utils/theme";

export default function MetaInfoRow(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.year}</Text>
      {props.runtime && ( // only render if value is true
        <Text style={styles.text}>{props.runtime}</Text>
      )}
      <Text style={styles.text}>{props.genre}</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.text}>{props.rating}</Text>
        <Ionicons
          name="star"
          size={SIZES.sm}
          color={COLORS.yellowDark}
        ></Ionicons>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    flexWrap: "wrap",
    gap: SIZES.sm,
    paddingVertical: SIZES.xs,
    paddingHorizontal: SIZES.sm,
    backgroundColor: COLORS.greyLight,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
  },
  text: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.sm,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});

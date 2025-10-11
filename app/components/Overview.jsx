import { StyleSheet, Text, View } from "react-native";
import globalStyles from "../utils/globalStyles";
import { SIZES } from "../utils/theme";

export default function Overview(props) {
  return (
    <View style={styles.overview}>
      <Text style={globalStyles.heading}>Overview</Text>
      <Text style={globalStyles.bodyText}>{props.overview}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overview: {
    gap: SIZES.xs,
    paddingVertical: SIZES.buttonVertical,
    paddingHorizontal: SIZES.buttonHorizontal,
  },
});

import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import globalStyles from "../utils/globalStyles";
import { SIZES } from "../utils/theme";

export default function CastMemberCard(props) {
  return (
    <ScrollView horizontal={true} style={styles.list}>
      <View>
        <Image></Image>
        <Text style={styles.characterName}>{props.characterName}</Text>
        <Text style={styles.fullName}>{props.fullName}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  overview: {
    gap: SIZES.xs,
    paddingVertical: SIZES.buttonVertical,
    paddingHorizontal: SIZES.buttonHorizontal,
  },
});

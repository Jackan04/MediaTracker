import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import globalStyles from "../utils/globalStyles";
import { COLORS, FONT_SIZES, SIZES } from "../utils/theme";

export default function SeasonItem(props) {
  const [seasons, setSeasons] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSeasons(props.seasons || []);
  }, [props.seasons]);

  if (seasons.length === 0) {
    return null;
  }

  const toggleDropDown = () => {
    open === false ? setOpen(true) : setOpen(false);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={toggleDropDown}>
        <View style={styles.dropdown}>
          <Text style={globalStyles.heading}>Seasons</Text>
          <Ionicons
            name={open ? "arrow-down" : "arrow-forward"}
            size={FONT_SIZES.lg}
            color={COLORS.heading}
          ></Ionicons>
        </View>
      </Pressable>
      {open && (
        <View style={styles.dropdownList}>
          {seasons.map((season, index) => (
            <View style={styles.card} key={index}>
              <Text style={globalStyles.bodyText}>{season.name}</Text>
              <Text style={styles.episode}>
                Episodes: {season.episode_count}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SIZES.xs,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    padding: SIZES.xs,
  },
  episode: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.subText,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: COLORS.subText,
    paddingVertical: SIZES.buttonVertical,
    paddingHorizontal: SIZES.buttonHorizontal,
    borderRadius: SIZES.radius,
  },
  dropdownList: {
    paddingHorizontal: SIZES.buttonHorizontal,
  },
});

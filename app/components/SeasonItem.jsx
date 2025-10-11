import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import globalStyles from "../utils/globalStyles";
import { COLORS, FONT_SIZES, SIZES } from "../utils/theme";

export default function SeasonItem(props) {
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    setSeasons(props.seasons || []);
  }, [props.seasons]);

  if(!props.sesons){
    return null
  }

  return (
    <View style={styles.container}>
      <Text style={globalStyles.heading}>Seasons</Text>
      <View>
        {seasons.map((season, index) => (
          <View style={styles.card} key={index}>
            <Text style={globalStyles.bodyText}>{season.name}</Text>
            <Text style={styles.episode}>Episodes: {season.episode_count}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SIZES.xs,
    marginTop: SIZES.md,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    padding: SIZES.xs,
  },
  season: {},
  episode: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.subText
    
},
});

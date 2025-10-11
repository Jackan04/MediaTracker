import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SeasonItem(props) {
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    setSeasons(props.seasons || []);
  }, [props.seasons]); // Fix: depend on props.seasons, not seasons state

  if (!seasons || seasons.length === 0) {
    return null; // Don't render anything if no seasons
  }

  return (
    <View>
      {seasons.map((season, index) => (
        <View style={styles.card} key={index}>
          <Text style={styles.season}>
             {season.name}
          </Text>
          <Text style={styles.episodes}>Episodes: {season.episode_count}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  season: {},
  episodes: {},
});

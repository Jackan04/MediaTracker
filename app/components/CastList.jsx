import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { getCast } from "../api/tmdb";
import globalStyles from "../utils/globalStyles";
import { COLORS, FONT_SIZES, SIZES } from "../utils/theme";

export default function CastMemberCard(props) {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const loadCast = async () => {
      try {
        const result = await getCast(props.tmdb_id, props.media_type);
        console.log(result);
        setCast(result);
      } catch (error) {
        console.error("Error getting cast: ", error);
      }
    };
    loadCast();
  }, [props.tmdb_id]);

  return (
    <View style={styles.container}>
      <Text style={globalStyles.heading}>Cast</Text>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          gap: 8,
        }}
      >
        {cast.slice(0, 10).map((item, index) => {
          return (
            <View key={index} style={styles.card}>
              <Image
                style={styles.profile}
                source={{ uri: item.profile }}
                placeholder="https://via.placeholder.com/120x180?text=No+Image"
                contentFit="cover"
              ></Image>
              <Text style={styles.characterName}>{item.character}</Text>
              <Text style={styles.fullName}>{item.name}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SIZES.sm,
  },
  card: {
    width: 90,
    alignItems: "center",
  },
  profile: {
    width: 60,
    height: 90,
    borderRadius: 8,
    marginBottom: SIZES.xs,
  },
  characterName: {
    textAlign: "center",
    fontSize: FONT_SIZES.xs,
    color: COLORS.textPrimary,
    fontWeight: 500,
    marginBottom: 2,
    flexWrap: "wrap",
  },
  fullName: {
    textAlign: "center",
    fontSize: 10,
    color: COLORS.subText,
    flexWrap: "wrap",
  },
});

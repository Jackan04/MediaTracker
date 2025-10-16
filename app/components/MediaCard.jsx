import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS, FONT_SIZES, SIZES } from "../utils/theme";

export default function MediaCard(props) {
  const handlePress = () => {
    if (!props.item || !props.item.tmdb_id || !props.item.media_type) {
      console.warn("MediaCard: Missing required item data for navigation");
      return;
    }

    // Pass the 'id' and 'media_type' parameters to the function on the DetailScreen page to retrieve the relevant details.
    router.push({
      pathname: "/detailScreen/DetailScreen",
      params: {
        tmdb_id: props.item.tmdb_id,
        media_type: props.item.media_type,
      },
    });
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Image
        source={{ uri: props.posterUrl }}
        style={styles.poster}
        placeholder="https://via.placeholder.com/120x180?text=No+Image"
        contentFit="cover"
      />
      <View style={styles.texts}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {props.title}
        </Text>
        <Text style={styles.year}>{props.year}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 105,
    borderRadius: SIZES.radius,
    gap: SIZES.xxs,
  },
  poster: {
    width: 105,
    height: 155,
    borderRadius: SIZES.radius,
  },
  texts: {
    gap: SIZES.xxs,
  },
  title: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textPrimary,
  },
  year: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.subText,
  },
});

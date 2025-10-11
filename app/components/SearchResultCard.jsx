import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS, FONT_SIZES, SIZES } from "../utils/theme";

export default function SearchResultCard(props){

     const handlePress = () => {
        if (!props.item || !props.item.tmdb_id || !props.item.media_type) {
            console.warn('SearchResultCard: Missing required item data for navigation');
            return;
        }
        
        // Pass the 'id' and 'media_type' parameters to DisplayDetails() on the DetailScreen page to retrieve the relevant details
        router.push({
          pathname: "/detailScreen/DetailScreen",
          params: {
            tmdb_id: props.item.tmdb_id,
            media_type: props.item.media_type,
          },
        });
    }

    return(
        <Pressable style={styles.container} onPress={handlePress}>
            <View style={styles.leftContent}>
                <Image 
                source={{ uri: props.posterUrl }} 
                style={styles.poster}
                placeholder="https://via.placeholder.com/120x180?text=No+Image"
                contentFit="cover"
            />
            <View style={styles.texts}>
                <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{props.title}</Text>
                <Text style={styles.year}>{props.year}</Text>
                <Text style={styles.mediaType}>{props.mediaType === "movie" ? "Movie" : "Show"}</Text>
            </View>
        </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
     container: {
        width: "100%",
        justifyContent: "space-between",
        flexDirection:"row",
        paddingVertical: SIZES.xs,
        alignItems: "center",
    },
    poster:{
        width: 60,
        height: 74,
        borderRadius: SIZES.radius,
    },
    texts:{
        gap: SIZES.xxs,
        flex: 1, 
        maxWidth: 180, 
    },
    title:{
        fontSize: FONT_SIZES.md,
        color: COLORS.textPrimary,
    },
    year:{
        fontSize: FONT_SIZES.sm,
        color: COLORS.subText,
    },
    mediaType:{
        fontSize: FONT_SIZES.sm,
        color: COLORS.subText,
    },
    leftContent:{
        flexDirection:"row",
        gap: SIZES.sm,
        alignItems: "center",
    }
})
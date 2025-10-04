import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS, FONT_SIZES, SIZES } from "../utils/theme";
import ButtonRounded from './Button/ButtonRounded';

export default function SearchResultCard(props){

    return(
        <Pressable style={styles.container}>
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
            <ButtonRounded></ButtonRounded>
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
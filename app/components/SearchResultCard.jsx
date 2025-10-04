import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, FONT_SIZES, SIZES } from "../utils/theme";
import ButtonRounded from './Button/ButtonRounded';

export default function SearchResultCard(props){

    return(
        <View style={styles.container}>
            <View style={styles.leftContent}>
                <Image 
                source={{ uri: props.posterUrl }} 
                style={styles.poster}
                placeholder="https://via.placeholder.com/120x180?text=No+Image"
                contentFit="cover"
            />
            <View style={styles.texts}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.year}>{props.year}</Text>
                <Text style={styles.mediaType}>{props.mediaType}</Text>
            </View>
        </View>
            <ButtonRounded></ButtonRounded>
        </View>
    )
}

const styles = StyleSheet.create({
     container: {
        width: "100%",
        justifyContent: "space-between",
        flexDirection:"row",
        alignItems: "center",
        paddingHorizontal: SIZES.md,
        paddingVertical: SIZES.lg,
        borderRadius: SIZES.radius,
        gap: SIZES.xxs,
    },
    poster:{
        width: 50,
        height: 74,
        borderRadius: SIZES.radius,
    },
    texts:{
        gap: SIZES.xxs,
    },
    title:{
        fontSize: FONT_SIZES.sm,
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
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { SIZES, COLORS, FONT_SIZES } from "../utils/theme";

export default function MediaCard(props){

    return(
        <View style={styles.container}>
            <Image 
                source={{ uri: props.posterUrl }} 
                style={styles.poster}
                placeholder="https://via.placeholder.com/120x180?text=No+Image"
                contentFit="cover"
            />
            <View style={styles.texts}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.year}>{props.year}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 105,
        height: 155,
        borderRadius: SIZES.radius,
        gap: SIZES.xxs,
    },
    poster:{
        width: 105,
        height: 155,
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

    }

})
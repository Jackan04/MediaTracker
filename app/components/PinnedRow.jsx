import { StyleSheet, View } from "react-native"
import { COLORS, SIZES } from "../utils/theme.js"
import MediaCard from "./MediaCard"


export default function PinnedRow(){

    return(
        <View style={styles.container}>

            <MediaCard posterUrl="https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg" title="The Godfather" year="1972"></MediaCard>
            <MediaCard posterUrl="https://image.tmdb.org/t/p/w500/56v2KjBlU4XaOv9rVYEQypROD7P.jpg" title="Stranger Things" year="2016"></MediaCard>
            <MediaCard posterUrl="https://image.tmdb.org/t/p/w500/rSPw7tgCH9c6NqICZef4kZjFOQ5.jpg" title="Avengers: Endgame" year="2019"></MediaCard> 
    
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-start", 
        margin: SIZES.sm,
        borderRadius: SIZES.radius,
        paddingVertical: SIZES.sm, 
        backgroundColor: COLORS.greyLight,
        borderWidth: 1,
        borderColor: COLORS.border,
    }
})
import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { getPinnedItems } from "../server/queries.js"
import { COLORS, SIZES } from "../utils/theme.js"
import MediaCard from "./MediaCard"


export default function PinnedRow(props){
    const [pinnedItems, setPinnedItems] = useState([])

    useEffect(() => {
        const loadPinnedItems = async () => {
            const result = await getPinnedItems(props.mediaType)
            setPinnedItems(result || [])
        }

        loadPinnedItems()
    }, [props.mediaType])

    return(
        <View style={styles.container}> 
            {pinnedItems.map((item, index) => 
            <MediaCard 
                item={item}
                key={index}  
                posterUrl={`https://image.tmdb.org/t/p/w500${item.poster_path}`} 
                title={item.title}
                year={item.year}
            ></MediaCard>)} 
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        justifyContent:"space-evenly",
        alignItems: "flex-start", 
        marginTop: SIZES.sm,
        borderRadius: SIZES.radius,
        paddingVertical: SIZES.sm, 
        backgroundColor: COLORS.greyLight,
        borderWidth: 1,
        borderColor: COLORS.border,
    }
})
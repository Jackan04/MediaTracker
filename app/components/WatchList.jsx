import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getSavedItems } from "../server/queries.js";
import globalStyles from "../utils/globalStyles.js";
import { COLORS, SIZES } from "../utils/theme.js";
import Button from "./Button/Button";
import MediaCard from "./MediaCard.jsx";

export default function WatchList(props){
    const [watchList, setWatchlist] = useState([])
    const [activeFilter, setActiveFilter] = useState('watchlist') // 'watchlist' or 'archived'
    

    useEffect(() => {
        const loadWatchList = async () => {
            try {
                const isWatched = activeFilter === 'archived' ? 1 : 0;
                const result = await getSavedItems(props.mediaType, isWatched);
                setWatchlist(result || []);
            } catch (error) {
                console.error("Error loading watchlist:", error);
                setWatchlist([]);
                throw error
            }
        };
        
        loadWatchList();
    }, [props.mediaType, activeFilter])

    return(
        <View style = {styles.container}>            
             <View style = {styles.filterHeader}>
                <Text style={[globalStyles.heading, styles.heading]}>{activeFilter === "watchlist" ? "Watchlist" : "Archived"}</Text>
                <View style = {styles.buttons}>
                <Button 
                    text="Watchlist"
                    onPress={() => setActiveFilter('watchlist')}
                    buttonBgColor={activeFilter === 'watchlist' ? COLORS.blueLight : COLORS.greyLight}
                    buttonTextColor={activeFilter === 'watchlist' ? COLORS.blueDark : COLORS.greyDark}
                />

                <Button 
                    text="Archived"
                    onPress={() => setActiveFilter('archived')}
                    buttonBgColor={activeFilter === 'archived' ? COLORS.blueLight : COLORS.greyLight}
                    buttonTextColor={activeFilter === 'archived' ? COLORS.blueDark : COLORS.greyDark}
                />
                </View>
             
            </View>
            
            <View style={styles.grid}>
                {watchList.map(item => (
                    <MediaCard 
                        item={item}
                        key={item.id}
                        posterUrl={`https://image.tmdb.org/t/p/w500${item.poster_path}`} 
                        title={item.title}
                        year={item.year}
                    />
                ))}
            </View>           
        </View>
       


    )
}

const styles = StyleSheet.create({
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        gap: SIZES.sm,
        marginTop: SIZES.lg,
        paddingBottom: SIZES.xl, // Extra padding for tab bar
    },
    filterHeader:{
        marginTop: SIZES.lg,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems: "center",
        gap: SIZES.sm,
    },
    buttons:{
        flexDirection:"row",
        gap: SIZES.sm,
    }
})
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { getSavedItems } from "../server/queries.js";
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
            
            <FlatList 
            style={styles.list}
            data={watchList}
            numColumns={3}
            columnWrapperStyle={styles.row}
            renderItem={({item}) => (
                <MediaCard 
                    posterUrl={`https://image.tmdb.org/t/p/w500${item.poster_path}`} 
                    title={item.title}
                    year={item.year}
                />
            )}
            keyExtractor={item => item.id.toString()}
            />           
        </View>
       


    )
}

const styles = StyleSheet.create({
    list:{
        marginTop: 30,
    },
    buttons:{
        gap: SIZES.sm,
        flexDirection: "row",
        justifyContent: "center",
    },
    row:{
        justifyContent: "space-around"
    }
   

})
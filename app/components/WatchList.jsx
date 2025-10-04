import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { getSavedItems } from "../server/queries.js";
import { SIZES, COLORS } from "../utils/theme.js";
import Button from "./Button/Button";
import MediaCard from "./MediaCard.jsx";

export default function WatchList(props){
    const [watchList, setWatchlist] = useState([])
    const [activeFilter, setActiveFilter] = useState('watchlist') // 'watchlist' or 'archived'
    const isMovie = props.mediaType === 'movie';

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
                />

                <Button 
                    text="Archived"
                    onPress={() => setActiveFilter('archived')}
                    buttonBgColor = {COLORS.greyLight}
                    buttonTextColor = {COLORS.greyDark}
                />
            </View>
            
            <FlatList 
            style={styles.list}
            data={watchList}
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
    container: {
      flex: 1,
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
    },
    list:{
        gap: SIZES.xs,
    }
   

})
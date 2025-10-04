import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getSavedItems } from "../server/queries.js";
import Button from "./Button/Button";
import Header from "./Header";
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
            <Header>{props.mediaType === "movie" ? "Movies" : "Shows"}</Header>
            
            <SafeAreaView style={styles.container}>
             <View style = {styles.buttons}>
                <Button 
                    text="Watchlist"
                    onPress={setActiveFilter("watchlist")}
                />

                <Button 
                    text="Archived"
                    onPress={() => setActiveFilter('archived')}
                />
            </View>
            
            <FlatList 
            style={styles.items}
            data={watchList}
            renderItem={({item}) => (
                <MediaCard 
                    posterUrl={`https://image.tmdb.org/t/p/w500${item.poster_path}`} // TMDB base URL (500 in size) + poster path
                    title={item.title}
                    year={item.year}
                />
            )}
            keyExtractor={item => item.id.toString()}
            />

            </SafeAreaView>
           

        </View>
       


    )
}

const styles = StyleSheet.create({
    container: {
      
    },
   

})
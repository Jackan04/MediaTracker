import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getTrendingMovies, getTrendingShows } from "../api/tmdb.js";
import Button from "../components/Button/Button.jsx";
import Header from "../components/Header.jsx";
import MediaCard from "../components/MediaCard.jsx";
import { initDb } from "../server/db.js";
import globalStyles from '../utils/globalStyles.js';
import { COLORS, SIZES } from "../utils/theme.js";

export default function Index() {

  const[trendingMovies, setTrendingMovies] = useState([])
  const[trendingShows, setTrendingShows] = useState([])
  const[activeFilter, setActiveFilter] = useState("movie")

   useEffect(() => {
      const loadData = async () => {
          try {
            await initDb()
          } catch (error) {
            console.error("Error initializing database:", error)
          }
        };
        loadData();
   }, [])

   useEffect(() => {
      
    const loadTrendingItems = async () =>{
        
      try{
          if(activeFilter === "movie"){
            const movies = await getTrendingMovies() 
            setTrendingMovies(movies)
          }
          else{
            const shows = await getTrendingShows() 
            setTrendingShows(shows)
          }
            
        }
        catch(error){
          console.error("Error when loading trending items", error)
        }
      }
      loadTrendingItems()

   }, [activeFilter])

  return (
    
      <SafeAreaView style={globalStyles.container} edges={['left', 'right', 'bottom', 'top']}>
        <Header title="Home"></Header>
        <View style={styles.filterHeader}>
          <Text style={[globalStyles.heading, styles.heading]}>{activeFilter === "movie" ? "Trending Movies" : "Trending Shows"}</Text>
            <View style = {styles.buttons}>
              <Button 
              text="Movies"
              buttonBgColor = {activeFilter === "movie" ? COLORS.blueLight : COLORS.greyLight}
              buttonTextColor = {activeFilter === "movie" ? COLORS.blueDark : COLORS.greyDark} 
              onPress={() => setActiveFilter("movie")}
            ></Button>

            <Button 
              text="Shows"
              buttonBgColor = {activeFilter === "tv" ? COLORS.blueLight : COLORS.greyLight}
              buttonTextColor = {activeFilter === "tv" ? COLORS.blueDark : COLORS.greyDark}
              onPress={() => setActiveFilter("tv")}
            ></Button>
            </View>
         
        </View>
        
        
        <FlatList
            style={styles.list}
            data={activeFilter === "movie" ? trendingMovies : trendingShows} 
            numColumns={3}
            columnWrapperStyle={styles.row}
            ItemSeparatorComponent={() => <View style={{ height: SIZES.sm }} />}
            renderItem={({item}) => (
              <MediaCard 
                  item={item}
                  posterUrl={`https://image.tmdb.org/t/p/w500${item.poster_path}`} 
                  title={item.title}
                  year={item.year}
              />
            )}
            keyExtractor={item => item.tmdb_id}
            
          />  
      
      </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
      filterHeader:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems: "center",
        gap: SIZES.sm,

      },
      row:{
        justifyContent: "space-between",
      },
      buttons:{
        flexDirection:"row",
        gap: SIZES.sm,
    }
      
})

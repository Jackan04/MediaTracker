import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getTrendingMovies, getTrendingShows } from "../api/tmdb.js";
import { SIZES, COLORS } from "../utils/theme.js";
import Header from "../components/Header.jsx";
import { initDb } from "../server/db.js";
import globalStyles from '../utils/globalStyles.js';

import MetaInfoRow from "../components/MetaInfoRow.jsx";
import MediaCard from "../components/MediaCard.jsx";
import SearchResultCard from "../components/SearchResultCard.jsx";
import Button from "../components/Button/Button.jsx";

export default function Index() {

  const[trendingMovies, setTrendingMovies] = useState([])
  const[trendingShows, setTrendingShows] = useState([])

   useEffect(() => {
      const loadData = async () => {
          try {
            await initDb()
          } catch (error) {
            console.error("Error initializing database:", error)
          }
        };
        // loadData();
   }, [])

   useEffect(() => {
      
    const loadTrendingItems = async () =>{
        try{
        // Wait for both responses to return
         const [moviesResult, showsResult] = await Promise.all([
              getTrendingMovies(),
              getTrendingShows()
          ])

          console.log('Movies result:', moviesResult)
          console.log('Shows result:', showsResult)

          setTrendingMovies(moviesResult.results || [])
          setTrendingShows(showsResult.results || [])
        }
        catch(error){
          console.error("Error when loading trending items", error)
        }
      }
      // loadTrendingItems()

   }, [])

  return (
    <View style={styles.container}>
      <Header title="Home"/>        
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View>
            <Text style={globalStyles.heading}>Trending Movies</Text>
            {trendingMovies.map(movie => (
              <Text key={movie.id}>{movie.title}</Text>
            ))}
          </View>
            <View>
            <Text style={globalStyles.heading}>Trending Shows</Text>
              {trendingShows.map(show => (
              <Text key={show.id}>{show.name}</Text>
            ))}
          </View>
          
          {/* Testing */}
          <View style={styles.testing}>
              <MetaInfoRow year="2025" runtime="2h" genre="Action" rating="4"></MetaInfoRow>   
         
          <Button text="Button" buttonBgColor={COLORS.blueLight} buttonTextColor={COLORS.blueDark}></Button>
          
          <Button text="Button" buttonBgColor={COLORS.greenLight} buttonTextColor={COLORS.greenDark}></Button>
          
          <MediaCard posterUrl="https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg" title="The Godfather (1972)" year="1972"></MediaCard>
          
          <SearchResultCard posterUrl="https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg" title="The Godfather (1972)" year="1972" mediaType="Thriller, Drama"></SearchResultCard>
          </View>
        
          

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
      container:{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: COLORS.background,
      },
      testing:{
        gap: 20,
      }
})

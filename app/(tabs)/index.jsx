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
import PinnedRow from "../components/PinnedRow.jsx";

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
        loadData();
   }, [])

   useEffect(() => {
      
    const loadTrendingItems = async () =>{
        try{
        // Wait for both responses to return
         const [moviesResult, showsResult] = await Promise.all([
              getTrendingMovies(),
              getTrendingShows()
          ])

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

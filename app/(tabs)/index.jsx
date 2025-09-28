import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getTrendingMovies, getTrendingShows } from "../api/tmdb.js";
import { SIZES, COLORS } from "../utils/theme.js";
import Header from "../components/Header.jsx";
import Button from "../components/Button/Button.jsx";
import MetaInfoRow from "../components/MetaInfoRow.jsx";
import { initDb } from "../server/db.js";
import globalStyles from '../utils/globalStyles.js';

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
    <View style={globalStyles.container}>
      <Header title="Home"/>        
      <SafeAreaView style={globalStyles.container}>
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
          <MetaInfoRow year="2025" runtime="2h" genre="Action" rating="4"></MetaInfoRow>
   
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({

})

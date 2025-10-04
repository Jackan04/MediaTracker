import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getTrendingMovies, getTrendingShows } from "../api/tmdb.js";
import MediaCard from "../components/MediaCard.jsx";
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

          setTrendingMovies(moviesResult || [])
          setTrendingShows(showsResult || [])
        }
        catch(error){
          console.error("Error when loading trending items", error)
        }
      }
      loadTrendingItems()

   }, [])

  return (
    
      <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
        
        <Text style={[globalStyles.heading, styles.heading]}>Trending Movies</Text>
        <FlatList
            style={styles.list}
            data={trendingMovies} 
            numColumns={3}
            columnWrapperStyle={styles.row}
            renderItem={({item}) => (
                <MediaCard 
                    posterUrl={`https://image.tmdb.org/t/p/w500${item.poster_path}`} 
                    title={item.title}
                    year={item.year}
                />
            )}
            keyExtractor={item => item.tmdb_id}
            
          />  
          <View style={styles.seperator}></View>
        
        <Text style={[globalStyles.heading, styles.heading]}>Trending Shows</Text>
        <FlatList
          style={styles.list}
            data={trendingShows}
            numColumns={3}
            columnWrapperStyle={styles.row}
            renderItem={({item}) => (
                <MediaCard 
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
      container:{
          flex: 1,
          gap: 30,
          
      },
      row:{
        justifyContent: "space-around"
      },
      heading:{
       alignSelf: "center"
     },
     seperator:{
      borderWidth: 1,
      borderColor: "#333"
     }
      
})

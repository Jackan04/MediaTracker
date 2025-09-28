import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import globalStyles from '../utils/globalStyles.js';
import { initDb } from "../server/db.js";
import Header from "../components/Header.jsx";

export default function Index() {
   useEffect(() => {
      const loadData = async () => {
          try {
            await initDb()
          } catch (error) {
            console.error('Error initializing database:', error)
          }
        };
        loadData();
   }, [])

  return (
    <View style={globalStyles.container}>
      <Header title="Home"/>        
      <SafeAreaView style={globalStyles.container}>
        <ScrollView>
          <View>
            <Text style={globalStyles.heading}>Trending Movies</Text>
          </View>
            <View>
            <Text style={globalStyles.heading}>Trending Shows</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({

})

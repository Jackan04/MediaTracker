import { Text, View } from "react-native";
import { useState, useEffect } from "react";
import globalStyles from '../utils/globalStyles.js'
import { SafeAreaView } from "react-native-safe-area-context";
import { initDb} from "../server/db.js";

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
   })

  return (
    <View style={globalStyles.container}>
      <SafeAreaView >
        <Text style={globalStyles.title}>Title!</Text>
        <Text style={globalStyles.heading}>Heading!</Text>
    </SafeAreaView>
    </View>
  
  );
}

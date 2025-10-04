import { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SIZES, COLORS, FONT_SIZES } from "../utils/theme";
import {getMovieDetails, getShowDetails} from "../api/tmdb";
import {getSavedItems} from "../server/queries.js"
import Button from "./Button/Button";
import Header from "./Header";

export default function WatchList(props){

    return(
        <View style = {styles.container}>
            <Header>{props.mediaType === "movie" ? "Movies" : "Shows"}</Header>
            
            <SafeAreaView style={styles.container}>
             <View style = {styles.buttons}>
                <Button 
                text="Watchlist"
                onPress={props.mediaType === "movie" ? getSavedItems("movie", 0) : getSavedItems("tv", 0)} 
                >
                </Button>

                <Button 
                text="Archived"
                onPress={props.mediaType === "movie" ? getSavedItems("movie", 1) : getSavedItems("tv", 1)} 
                >
                </Button>

            </View>
            
            <FlatList style={styles.items}>

            </FlatList>

            </SafeAreaView>
           

        </View>
       


    )
}

const styles = StyleSheet.create({
    container: {
      
    },
   

})
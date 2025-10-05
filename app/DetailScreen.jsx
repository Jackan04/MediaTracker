import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getItemDetails } from "./api/tmdb";
import Button from "./components/Button/Button";
import Header from "./components/Header";
import MetaInfoRow from "./components/MetaInfoRow";
import { insertItem } from "./server/queries";
import globalStyles from "./utils/globalStyles";

export default function DetailScreen(){
    const params = useLocalSearchParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const displayDetails = async () => {
            try {
                setLoading(true);
                const result = await getItemDetails(params.tmdb_id, params.media_type);
                setItem(result);
                console.log(result)
            } catch (error) {
                console.error('Error fetching details:', error);
            } finally {
                setLoading(false);
            }
        }

        if (params.tmdb_id && params.media_type) {
            displayDetails();
        }
    }, [params.tmdb_id, params.media_type]);


    if (loading) {
        return (
            <SafeAreaView style={globalStyles.container} edges={['left', 'right', 'bottom']}>
                <Header title="Details" />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Loading...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (!item) {
        return (
            <SafeAreaView style={globalStyles.container} edges={['left', 'right', 'bottom']}>
                <Header title="Details" />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Error loading details</Text>
                </View>
            </SafeAreaView>
        );
    }


    return(
        <SafeAreaView style={globalStyles.container} edges={['left', 'right', 'bottom']}>
            <Header title="Details" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Image 
                        style={styles.poster}
                        source={{ uri: item.poster_path }} 
                        placeholder="https://via.placeholder.com/120x180?text=No+Image"
                        contentFit="cover"
                    />

                    <Text style={[styles.title, globalStyles.title]}>{item.title}</Text>
                    <MetaInfoRow
                        year={item.year}
                        runtime={ item.media_type === "movie" ? Math.round((item.runtime_minutes / 60) * 10) / 10 + "h" : ""} // Round to one decimal  and display an empty string if the value is zero
                        genre={JSON.parse(item.genres_json).slice(0, 3).map(genre => genre.name).join(', ')} // Parse JSON, limit to 3 genres
                        rating={item.vote_average}
                    />
                    
                    <Button text="Add to Library" onPress={() => insertItem(item)} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    poster: {
        width: 200,
        height: 300,
        alignSelf: 'center',
        marginVertical: 20,
        borderRadius: 8,
    },
    title: {
        textAlign: 'center',
        marginBottom: 16,
    }
})
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getItemDetails } from "./api/tmdb";
import Button from "./components/Button/Button";
import Header from "./components/Header";
import MetaInfoRow from "./components/MetaInfoRow";
import { deleteItem, insertItem, isItemSaved } from "./server/queries";
import globalStyles from "./utils/globalStyles";
import { COLORS, SIZES } from "./utils/theme";

export default function DetailScreen(){
    const params = useLocalSearchParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSaved, setIsSaved] = useState()
    const router = useRouter()

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

    useEffect(() => {
        const checkIfSaved = async () => {
            if (item && item.tmdb_id) {
                try {
                    const savedStatus = await isItemSaved(item.tmdb_id);
                    setIsSaved(savedStatus);
                } catch (error) {
                    console.error('Error checking if item is saved:', error);
                }
            }
        };
        checkIfSaved();
    }, [item]); 

    const handleDelete = async () => {
    Alert.alert(
        "Remove from Library",
        "Are you sure you want to remove this item from your library?",
        [
            {
                text: "Cancel",
                style: "cancel"
            },
            {
            text: "Remove",
            style: "destructive",
            onPress: async () => {
                try {
                    await deleteItem(item.tmdb_id);
                    setIsSaved(false);
                } catch (error) {
                    console.error('Error deleting item:', error);
                }
            }
            }
        ]
    )
}
    const handleSave = async () => {
        try {
            await insertItem(item);
            setIsSaved(true);
        } catch (error) {
            console.error('Error saving item:', error);
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={globalStyles.container} edges={['left', 'right', 'bottom', 'top']}>
                <Header title="Details" />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Loading...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (!item) {
        return (
            <SafeAreaView style={globalStyles.container} edges={['left', 'right', 'bottom', 'top']}>
                <Header title="Details" />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Error loading details</Text>
                </View>
            </SafeAreaView>
        );
    }


    return(
        <SafeAreaView style={globalStyles.container} edges={['left', 'right', 'bottom', 'top']}>
            <View>
            <Button style={styles.backButton} text="Back" onPress={() => router.back()}></Button>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.top}>
                    <Image 
                        style={styles.poster}
                        source={{ uri: item.poster_path }} 
                        placeholder="https://via.placeholder.com/120x180?text=No+Image"
                        contentFit="cover"
                    />

                    <Text style={[globalStyles.title]}>{item.title}</Text>
                    <MetaInfoRow
                        year={item.year}
                        runtime={ item.media_type === "movie" ? Math.round((item.runtime_minutes / 60) * 10) / 10 + "h" : ""} // Round to one decimal  and display an empty string if the value is zero
                        genre={JSON.parse(item.genres_json).slice(0, 3).map(genre => genre.name).join(', ')} // Parse JSON, limit to 3 genres
                        rating={item.vote_average}
                    />
                    
                    <Button 
                        text={isSaved ? "Remove from Library" : "Save to Library"} 
                        onPress={isSaved ? handleDelete : handleSave} 
                        buttonTextColor = {isSaved ? COLORS.redDark : COLORS.blueDark}
                        buttonBgColor = {isSaved ? COLORS.redLight : COLORS.blueLight}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    top:{
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        gap: SIZES.sm,
    },
    poster: {
        width: 200,
        height: 300,
        borderRadius: 8,
    },
    backButton:{
        flex: 0,
        alignSelf: "flex-start",
    }
})
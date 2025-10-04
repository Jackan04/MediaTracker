import { StyleSheet, Text, View } from "react-native";
import PinnedRow from "../components/PinnedRow";
import WatchList from "../components/WatchList";
import globalStyles from "../utils/globalStyles";

export default function MovieScreen(){

    return(
        <View>
            <View style={styles.container}>
                <Text style={[globalStyles.heading, styles.heading]}>Pinned Movies</Text>
                <PinnedRow mediaType="movie" />
            </View>
            <WatchList mediaType="movie" />
        </View>
    )
}

const styles = StyleSheet.create({
    heading:{
       alignSelf: "center"
    }
})
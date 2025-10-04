import { StyleSheet, Text, View } from "react-native";
import PinnedRow from "../components/PinnedRow";
import WatchList from "../components/WatchList";
import globalStyles from "../utils/globalStyles";

export default function ShowScreen(){

    return(
        <View>
            <View style={styles.container}>
                <Text style={[globalStyles.heading, styles.heading]}>Pinned Shows</Text>
                <PinnedRow mediaType="tv" />
            </View>
            <WatchList mediaType="tv" />
        </View>
    )
}

const styles = StyleSheet.create({
    heading:{
       alignSelf: "center"
    }
})
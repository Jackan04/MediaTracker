import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PinnedRow from "../components/PinnedRow";
import WatchList from "../components/WatchList";
import globalStyles from "../utils/globalStyles";

export default function ShowScreen(){

    return(
        <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
            <View style={styles.container}>
                <Text style={[globalStyles.heading, styles.heading]}>Pinned Shows</Text>
                <PinnedRow mediaType="tv" />
            </View>
            <WatchList mediaType="tv" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    heading:{
       alignSelf: "center"
    }
})
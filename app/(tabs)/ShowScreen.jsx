import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PinnedRow from "../components/PinnedRow";
import WatchList from "../components/WatchList";
import globalStyles from "../utils/globalStyles";
import Header from "../components/Header";

export default function ShowScreen(){

    return(
        <SafeAreaView style={globalStyles.container} edges={['left', 'right', 'bottom']}>
            <Header title="Shows"></Header>
            <View>
                <Text style={globalStyles.heading}>Pinned Shows</Text>
                <PinnedRow mediaType="tv" />
            </View>
            <WatchList mediaType="tv" />
        </SafeAreaView>
    )
}


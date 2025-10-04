import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import PinnedRow from "../components/PinnedRow";
import WatchList from "../components/WatchList";
import globalStyles from "../utils/globalStyles";

export default function ShowScreen(){

    return(
        <SafeAreaView style={globalStyles.container} edges={['left', 'right', 'bottom']}>
            <Header title="Shows"></Header>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Text style={globalStyles.heading}>Pinned Shows</Text>
                    <PinnedRow mediaType="tv" />
                </View>
                <WatchList mediaType="tv" />
            </ScrollView>
        </SafeAreaView>
    )
}


import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import PinnedRow from "../components/PinnedRow";
import WatchList from "../components/WatchList";
import globalStyles from "../utils/globalStyles";

export default function MovieScreen(){

    return(
        <SafeAreaView style={globalStyles.container} edges={['left', 'right', 'bottom', 'top']}>
            <Header title="Movies"></Header>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Text style={globalStyles.heading}>Pinned Movies</Text>
                    <PinnedRow mediaType="movie" />
                </View>
                <WatchList mediaType="movie" />
            </ScrollView>
        </SafeAreaView>
    )
}

import { Text, View } from "react-native";
import PinnedRow from "../components/PinnedRow";
import WatchList from "../components/WatchList";

export default function MovieScreen(){

    return(
        <View>
            <Text>Pinned Movies</Text>
            <PinnedRow mediaType="movie" />
            <WatchList mediaType="movie" />
        </View>
    )
}
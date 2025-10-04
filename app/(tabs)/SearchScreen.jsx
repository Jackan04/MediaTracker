import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globalStyles from "../utils/globalStyles";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

export default function SearchScreen(){

    return(
        <SafeAreaView style={globalStyles.container} edges={['left', 'right', 'bottom']}>
            <Header title="Search"></Header>
            <SearchBar></SearchBar>
        </SafeAreaView>
    )
}
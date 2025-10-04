import { TextInput, StyleSheet, View } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import { SIZES, COLORS, FONT_SIZES } from "../utils/theme"

export default function SearchBar(){

    return(
        <View>
            <View style={styles.searchBar}>
                <Ionicons name="search" size={SIZES.md} color={COLORS.subText}></Ionicons>
                <TextInput style={styles.input} placeholder="Find something to watch">
                </TextInput>
            </View>

        </View>
     
      
    )
}

const styles = StyleSheet.create({
    searchBar:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        borderWidth: 2,
        borderRadius: 40,
        borderColor: COLORS.border,
    },
    input:{
        height: 50,
        width: "80%",
        fontSize: FONT_SIZES.md,

    },
    
})
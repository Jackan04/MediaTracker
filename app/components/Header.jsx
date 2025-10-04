import { StyleSheet, Text, View } from "react-native"
import globalStyles from "../utils/globalStyles.js"
import { COLORS } from "../utils/theme.js"


export default function Header(props){

    return(
        <View style={styles.container}>
            <Text style={[globalStyles.title, styles.headerText]}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems: "flex-start",
        width: "100%",
    },
    headerText: {
        color: COLORS.textPrimary,
    }
 

})
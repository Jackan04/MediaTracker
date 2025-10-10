import { Ionicons } from '@expo/vector-icons'
import { Pressable, StyleSheet } from "react-native"
import { COLORS, SIZES } from "../../utils/theme"

export default function ButtonRounded(props){

    return(
        <Pressable style={styles.button} onPress={props.onPress}>
            <Ionicons name="add" size={SIZES.sm} color={COLORS.blueDark}></Ionicons>
        </Pressable>
    )
}

const styles = StyleSheet.create({
   button:{
        backgroundColor: COLORS.blueLight,
        justifyContent: "center",
        alignItems: "center",
        width: SIZES.lg,
        height: SIZES.lg,
        borderRadius: 16,
   },
   icon:{
        color: COLORS.blueDark,
   }
})

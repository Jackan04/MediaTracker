import { Ionicons } from '@expo/vector-icons'
import { Pressable, StyleSheet } from "react-native"
import { COLORS, SIZES } from "../../utils/theme"

export default function ButtonRounded(props){

    return(
        <Pressable style={styles.button}>
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
        borderRadius: 16, // Half of width/height for circle
   },
   icon:{
        color: COLORS.blueDark,
   }
})

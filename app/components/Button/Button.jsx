import { Pressable, StyleSheet, Text } from "react-native"
import { SIZES, COLORS } from "../../utils/theme"

export default function Button(props){

    return(
        <Pressable style={[styles.button, { backgroundColor: props.buttonBgColor || COLORS.blueLight }]}>
            <Text style={[ styles.buttonText, { color: props.buttonTextColor || COLORS.blueDark }]}>
                {props.text}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button:{
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: SIZES.radius,
        // background color and text color are set dynamically with props
    },
    buttonText:{
        fontWeight: "500",
    }
})
import { Pressable, StyleSheet, Text } from "react-native"
import { COLORS, SIZES } from "../../utils/theme"

export default function Button(props){

    return(
        <Pressable onPress={props.onPress} style={[styles.button, { backgroundColor: props.buttonBgColor || COLORS.blueLight }]}>
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
        paddingVertical: SIZES.buttonVertical,
        paddingHorizontal: SIZES.buttonHorizontal, 
        borderRadius: SIZES.radius,
        alignSelf: "flex-start",
        // background color and text color are set dynamically with props
    },
    buttonText:{
        fontWeight: "500",
    }
})
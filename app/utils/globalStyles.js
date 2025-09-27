import { StyleSheet } from "react-native"
import {COLORS, FONT_SIZES, SIZES} from '../utils/theme.js'

const globalStyles = StyleSheet.create({
    
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background,
    },
    title:{
        fontFamily: 'Roboto-Bold',
        fontSize: FONT_SIZES.xxl,
        color: COLORS.textPrimary,
    },
    heading:{
        fontFamily: 'Roboto-Medium',
        fontSize: FONT_SIZES.lg,
        color: COLORS.textHeading,
    },
    bodyText:{
        fontFamily: 'Roboto-Regular',
        fontSize: FONT_SIZES.md, 
        color: COLORS.textPrimary,
    }


})

export default globalStyles
    

import { StyleSheet } from "react-native"
import { COLORS, FONT_SIZES, SIZES } from '../utils/theme.js'

const globalStyles = StyleSheet.create({
    

    container:{
        flex: 1,
        gap: 30,
        margin: SIZES.sm,
      },
    title:{
        fontWeight: 600,
        fontSize: FONT_SIZES.xxl,
        color: COLORS.textPrimary,
    },
    heading:{
        fontWeight: 500,
        fontSize: FONT_SIZES.lg,
        color: COLORS.textHeading,
    },
    bodyText:{
        fontWeight: 400,
        fontSize: FONT_SIZES.md, 
        color: COLORS.textPrimary,
    }


})

export default globalStyles
    

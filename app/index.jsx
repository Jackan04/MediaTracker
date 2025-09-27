import { Text, View } from "react-native";
import {FONTS} from './utils/theme.js'
import globalStyles from './utils/globalStyles.js'

export default function Index() {
  return (
    <View style={globalStyles.container}>

      <Text style={FONTS.title}>Hello World!</Text>
      
    </View>
  );
}

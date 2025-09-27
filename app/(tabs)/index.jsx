import { Text, View } from "react-native";
import {FONTS} from '../utils/theme.js'
import globalStyles from '../utils/globalStyles.js'
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={globalStyles.container}>

      <Text style={FONTS.title}>Hello World!</Text>
      
    </SafeAreaView>
  );
}

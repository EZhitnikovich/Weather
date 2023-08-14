import { StatusBar } from "expo-status-bar";
import { Image, Text, View } from "react-native";

export default function App() {
  return (
    <View>
      <StatusBar style="auto" />
      <Image
        blurRadius={80}
        source={require("./assets/images/bg.png")}
        className="h-full w-full"
      />
    </View>
  );
}

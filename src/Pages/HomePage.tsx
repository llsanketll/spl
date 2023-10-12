import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function HomePage() {
  const homeItems = ["Home", "View", "About"];
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Spectacular Premier League</Text>
      {homeItems.map((item, index) => (
        <Text key={index}>{item}</Text>
      ))}
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e6e6e6",
    padding: 20,
    paddingTop: 50,
  },
  text: {
    fontSize: 20,
  },
});

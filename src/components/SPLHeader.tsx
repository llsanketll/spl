import React from "react";
import { StyleSheet, View, Text } from "react-native";
import TextBold from "./Texts/TextBold";
import { Ionicons } from "@expo/vector-icons";

export default function SPLHeader() {
  return (
    <View style={styles.container}>
      <TextBold size={20} color="white">
        Fixtures
      </TextBold>
      <Ionicons name="football" size={24} color="white" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 10,
    backgroundColor: "#516bfa",
  },
});

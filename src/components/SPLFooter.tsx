import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import TextRegular from "./Texts/TextRegular";

export default function SPLFooter() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <FontAwesome5 name="calendar-alt" size={24} color="#516bfa" />
        <TextRegular color="#516bfa">Fixtures</TextRegular>
      </View>
      <View style={styles.iconContainer}>
        <MaterialIcons name="leaderboard" size={24} color="gray" />
        <TextRegular color="gray">Leaderboard</TextRegular>
      </View>
      <View style={styles.iconContainer}>
        <Ionicons name="person" size={24} color="gray" />
        <TextRegular color="gray">Profile</TextRegular>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderColor: "#cccccc",
    borderTopWidth: 1,
    position: "absolute",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: 80,
    bottom: 0,
  },
  iconContainer: {
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
});

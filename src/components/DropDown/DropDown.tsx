import { ScrollView } from "moti";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import TextRegular from "../Texts/TextRegular";
import TextBold from "../Texts/TextBold";
import { Entypo } from "@expo/vector-icons";

export default function DropDown() {
  const [isOpen, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState("Game Week");
  return (
    <>
      <TouchableOpacity style={styles.container} onPress={() => setOpen(!isOpen)}>
        <TextRegular>{selected}</TextRegular>
        <Entypo name="chevron-down" size={24} color="black" />
      </TouchableOpacity>
      {isOpen ? (
        <ScrollView style={styles.itemContainer} contentContainerStyle={{ alignItems: "center" }}>
          <TextRegular>Something</TextRegular>
          <TextRegular>Something</TextRegular>
          <TextRegular>Something</TextRegular>
          <TextRegular>Something</TextRegular>
        </ScrollView>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#acacac",
  },
  itemContainer: {
    position: "absolute",
    top: 60,
    right: 0,
    width: 200,
    backgroundColor: "#F2F2F2",
    borderColor: "#acacac",
    borderWidth: 1,
    borderRadius: 10,
    gap: 10,
    padding: 10,
    zIndex: 5,
  },
});

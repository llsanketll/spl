import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import TextBold from "./Texts/TextBold";
import TextRegular from "./Texts/TextRegular";
import { useGlobalContext } from "./Global/GlobalContext";

type SPLHeaderProps = {
  name: string;
};

export default function SPLHeader(props: SPLHeaderProps) {
  const { points } = useGlobalContext();

  return (
    <View style={styles.container}>
      <TextBold size={20} color="white">
        {props.name}
      </TextBold>
      <View style={styles.pointContainer}>
        <TextRegular color="white">Points : </TextRegular>
        <TextBold size={20} color="white">
          {points}
        </TextBold>
      </View>
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
  pointContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6f87ff",
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});

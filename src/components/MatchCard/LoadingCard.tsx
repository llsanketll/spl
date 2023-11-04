import { View } from "moti";
import React from "react";
import { StyleSheet } from "react-native";

export default function LoadingCard() {
  return (
    <View style={styles.container}>
      <View style={styles.topBlock} />
      <View style={styles.dataContainer}>
        <View style={styles.logoContainer}>
          <View style={{ width: 45, height: 45, backgroundColor: "#D6E5F8", borderRadius: 50 }} />
          <View
            style={{ width: 30, height: 15, backgroundColor: "#D6E5F8", borderRadius: 5 }}></View>
        </View>
        <View style={styles.resultContainer}>
          <View
            style={{ width: 50, height: 35, backgroundColor: "#D6E5F8", borderRadius: 5 }}></View>
          <View
            style={{ width: 80, height: 15, backgroundColor: "#D6E5F8", borderRadius: 5 }}></View>
        </View>
        <View style={styles.logoContainer}>
          <View style={{ width: 45, height: 45, backgroundColor: "#D6E5F8", borderRadius: 50 }} />
          <View
            style={{ width: 30, height: 15, backgroundColor: "#D6E5F8", borderRadius: 5 }}></View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#acacac",
    borderRadius: 20,
    paddingBottom: 20,
    marginVertical: 10,
    height: 140,
  },
  topBlock: {
    position: "absolute",
    top: 0,
    left: 135,
    width: 80,
    height: 20,
    backgroundColor: "#D6E5F8",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  dataContainer: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    gap: 10,
  },
  score: {},

  resultContainer: {
    justifyContent: "flex-end",
    gap: 10,
    alignItems: "center",
  },

  image: {
    width: 45,
    height: 45,
    marginHorizontal: 10,
    objectFit: "contain",
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: "#acacac",
    margin: 20,
  },

  pText: {
    marginHorizontal: 20,
    fontFamily: "Poppins Light",
  },
});

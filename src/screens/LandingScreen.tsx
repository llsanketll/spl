import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import TextBold from "@/components/Texts/TextBold";
import LoginTab from "@/components/LoginTab";
import { StackScreenProps } from "@/types/route_types";

export default function LandingScreen(props: StackScreenProps<"Landing">) {
  const [isLoginTabOpen, setLoginTabOpen] = React.useState(false);
  return (
    <View style={styles.container}>
      {isLoginTabOpen && <LoginTab {...props} closeTab={() => setLoginTabOpen(false)} />}
      <View style={styles.titleContainer}>
        <TextBold size={60} color="#FF7655">
          Spectular
        </TextBold>
        <TextBold size={34} color="white">
          Premier League
        </TextBold>
      </View>
      <Image source={require("assets/man.png")} style={styles.zat} />
      <Image source={require("assets/line.png")} style={styles.line} />
      <TouchableOpacity style={styles.loginButton} onPress={() => setLoginTabOpen(true)}>
        <TextBold size={18} color="white">
          Sign In
        </TextBold>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 5,
    flex: 1,
    backgroundColor: "#506BFA",
  },
  titleContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  zat: {
    position: "absolute",
    objectFit: "contain",
    width: 355,
    top: 100,
    right: "auto",
    zIndex: 1,
  },
  loginButton: {
    position: "absolute",
    bottom: 60,
    width: 250,
    height: 50,
    backgroundColor: "#FF7655",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  line: { position: "absolute", width: 475, top: 400, left: 0 },
});

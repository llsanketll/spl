// import { View } from "moti";
import { View } from "react-native";
import React, { useState } from "react";
import { Alert, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import TextBold from "./Texts/TextBold";
import TextLight from "./Texts/TestLight";
import { StackScreenProps } from "@/types/route_types";
import { auth } from "firebase.config.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import RegisterTab from "./RegisterTab";
import { Ionicons } from "@expo/vector-icons";

type LoginTabProps = StackScreenProps<"Landing"> & {
  closeTab: () => void;
};

export default function LoginTab(props: LoginTabProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const HandleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      props.navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error Signing In");
    }
  };
  return (
    <View
      // from={{ bottom: "-100%" }}
      // animate={{ bottom: 0 }}
      // transition={{ type: "timing", duration: 1000 }}
      style={styles.container}>
      {isRegister && (
        <RegisterTab {...props} closeTab={() => setIsRegister(false)} key="register" />
      )}
      {!isRegister && (
        <>
          <View style={styles.titleContainer}>
            <TextBold size={30} color="#032450">
              Login
            </TextBold>
            <Ionicons name="football" size={34} color="#506BFA" />
          </View>
          <View style={styles.form}>
            <TextLight color="gray">Email</TextLight>
            <TextInput
              placeholder="Enter Your Email"
              style={styles.input}
              value={email}
              onChangeText={text => setEmail(text)}
              textContentType="emailAddress"
              autoCapitalize="none"
            />
            <TextLight color="gray">Password</TextLight>
            <TextInput
              placeholder="Enter Your Password"
              value={password}
              onChangeText={text => setPassword(text)}
              textContentType="password"
              secureTextEntry
              style={styles.input}
            />
            <TextBold size={16} color="#002250">
              Forgot Password?
            </TextBold>
            <TouchableOpacity style={styles.loginButton} onPress={HandleSignIn}>
              <TextBold size={18} color="white">
                Login
              </TextBold>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signInButton} onPress={() => setIsRegister(true)}>
              <TextBold size={18} color="#506BFA">
                Register
              </TextBold>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: 560,
    backgroundColor: "white",
    bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: 10,
  },
  cross: {
    position: "absolute",
    top: 20,
    left: 50,
  },
  titleContainer: {
    marginTop: 50,
    marginHorizontal: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  form: {
    marginLeft: 50,
    marginTop: 30,
    marginRight: 50,
  },
  loginButton: {
    marginTop: 30,
    height: 50,
    backgroundColor: "#506BFA",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  signInButton: {
    marginTop: 20,
    height: 50,
    borderWidth: 2,
    borderColor: "#506BFA",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#cfcfcf",
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    color: "#002250",
    fontFamily: "Poppins",
  },
});

import { MotiView, View } from "moti";
import React, { useState } from "react";
import { Alert, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import TextBold from "./Texts/TextBold";
import TextLight from "./Texts/TestLight";
import { StackScreenProps } from "@/types/route_types";
import { auth, db } from "firebase.config.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AntDesign } from "@expo/vector-icons";
import { FirebaseError } from "firebase/app";
import { doc, setDoc } from "firebase/firestore";

type RegisterTabProps = StackScreenProps<"Landing"> & {
  closeTab: () => void;
};

export default function RegisterTab({ navigation, closeTab }: RegisterTabProps) {
  const [isLoading, setIsLoading] = useState(false); // [1]
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const HandleSignUp = async () => {
    setIsLoading(true);
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;
      if (userCred.user === null) throw new Error("Error Signing Up");
      const docRef = await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        username: username,
      });
      navigation.navigate("Home");
    } catch (error) {
      setIsLoading(false);
      if (error instanceof FirebaseError) {
        Alert.alert("Error Signing In", error.message);
        console.log(error.message);
      }
    }
  };
  return (
    <>
      <TouchableOpacity onPress={closeTab} style={styles.arrow}>
        <AntDesign name="arrowleft" size={24} color="#032450" />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <TextBold size={30} color="#032450">
          Register
        </TextBold>
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
        <TextLight color="gray">Username</TextLight>
        <TextInput
          placeholder="Enter Your Username"
          style={styles.input}
          value={username}
          onChangeText={text => setUsername(text)}
          textContentType="username"
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
        <TouchableOpacity
          style={isLoading ? styles.buttonDisable : styles.signInButton}
          onPress={HandleSignUp}
          disabled={isLoading}>
          <TextBold size={18} color={isLoading ? "gray" : "#506BFA"}>
            Register
          </TextBold>
        </TouchableOpacity>
      </View>
    </>
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
  arrow: {
    position: "absolute",
    marginTop: 20,
    marginLeft: 20,
  },
  titleContainer: {
    marginTop: 50,
    marginLeft: 50,
  },
  form: {
    marginLeft: 50,
    marginTop: 30,
    marginRight: 50,
  },
  buttonDisable: {
    marginTop: 20,
    height: 50,
    borderWidth: 2,
    borderColor: "gray",
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

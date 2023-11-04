import { Entypo } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useGlobalContext } from "./Global/GlobalContext";

type EditButtonProps = {
  UploadPrediction: () => void;
};

export default function EditButton({ UploadPrediction }: EditButtonProps) {
  const { gameWeek } = useGlobalContext();
  const { currentWeek } = useGlobalContext();
  const { isEditMode, setIsEditMode } = useGlobalContext();
  if (gameWeek > currentWeek) {
    if (isEditMode !== true)
      return (
        <TouchableOpacity style={styles.editButton} onPress={() => setIsEditMode(true)}>
          <Entypo name="pencil" size={24} color="white" />
        </TouchableOpacity>
      );
    else
      return (
        <>
          <TouchableOpacity style={styles.checkButton} onPress={UploadPrediction}>
            <Entypo name="check" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.crossButton} onPress={() => setIsEditMode(false)}>
            <Entypo name="cross" size={24} color="white" />
          </TouchableOpacity>
        </>
      );
  } else return null;
}

const styles = StyleSheet.create({
  editButton: {
    position: "absolute",
    height: 50,
    width: 50,
    bottom: 100,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#506BFA",
  },
  checkButton: {
    position: "absolute",
    height: 50,
    width: 50,
    bottom: 100,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#21B64B",
  },
  crossButton: {
    position: "absolute",
    height: 50,
    width: 50,
    bottom: 100,
    right: 80,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fe3131",
  },
});

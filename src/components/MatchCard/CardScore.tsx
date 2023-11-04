import { View } from "moti";
import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import TextBold from "../Texts/TextBold";
import TextLight from "../Texts/TestLight";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "firebase.config";
import { useGlobalContext } from "../Global/GlobalContext";

type CardScoreProps = {
  prediction: [string, string];
  isTimePassed: boolean;
  gameTime: string;
  score: [number, number];
  gameNumber: number;
};

export default function CardScore(props: CardScoreProps) {
  const { isEditMode } = useGlobalContext();
  const [predictionText, setPredictionText] = useState(props.prediction);
  const { canUpload, setCanUpload } = useGlobalContext();
  const { gameWeek } = useGlobalContext();

  useEffect(() => {
    setPredictionText(props.prediction);
  }, [props.gameTime]);

  useEffect(() => {
    if (canUpload)
      setDoc(
        doc(
          db,
          `users/${auth.currentUser?.uid}/gameweeks/gw${gameWeek}/predictions`,
          `match${props.gameNumber}`
        ),
        {
          prediction: predictionText,
          point: 0,
        }
      ).then(() => setCanUpload(false));
  }, [canUpload]);

  if (isEditMode)
    return (
      <View style={styles.scoreContainer}>
        <TextInput
          keyboardType="number-pad"
          value={predictionText[0]}
          onChangeText={text => setPredictionText([text, predictionText[1]])}
          style={styles.predictionScore}
        />
        <TextBold size={30}> : </TextBold>
        <TextInput
          keyboardType="number-pad"
          value={predictionText[1]}
          onChangeText={text => setPredictionText([predictionText[0], text])}
          style={styles.predictionScore}
        />
      </View>
    );

  if (props.isTimePassed)
    return (
      <View style={styles.middleContainer}>
        <TextBold style={styles.scoreText}>
          {props.score[0]} : {props.score[1]}
        </TextBold>
        <TextLight color="gray">{`Prediction: ${predictionText[0]}-${predictionText[1]}`}</TextLight>
      </View>
    );
  else
    return (
      <View style={styles.middleContainer}>
        <TextBold style={styles.timeText}>{props.gameTime}</TextBold>
        <TextLight color="gray">{`Prediction: ${predictionText[0]}-${predictionText[1]}`}</TextLight>
      </View>
    );
}

const styles = StyleSheet.create({
  middleContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginHorizontal: 20,
  },
  scoreText: {
    fontSize: 30,
    fontFamily: "Poppins Bold",
  },
  predictionScore: {
    fontFamily: "Poppins SemiBold",
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: "#27374D",
    fontSize: 20,
    height: 40,
    width: 40,
    color: "white",
    borderRadius: 10,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  timeText: {
    fontSize: 15,
    fontFamily: "Poppins",
    color: "#4f5368",
    borderColor: "#d8d8d8",
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 2,
    borderRadius: 5,
    textAlign: "center",
    textAlignVertical: "center",
    marginBottom: 5,
  },
});

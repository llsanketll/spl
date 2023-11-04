import React, { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import CardWinState from "./CardWinState";
import TextSemi from "@/components/Texts/TextSemi";
import CardScore from "./CardScore";
import { useGlobalContext } from "../Global/GlobalContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "firebase.config";

export type MatchCardProps = {
  homeTeam: number;
  awayTeam: number;
  teamData: TeamDataType[];
  gameNumber: number;
  isCurrent: boolean;
  kickoffTime: string;
  prediction: [string, string];
  score: [number, number];
};
export type TeamDataType = {
  name: string;
  short_name: string;
  code: number;
};

export default function MatchCard({
  homeTeam,
  awayTeam,
  teamData,
  kickoffTime,
  gameNumber,
  prediction = ["0", "0"],
  score = [0, 0],
}: MatchCardProps) {
  const [isTimePassed, setTimePassed] = useState(false);
  const [gameTime, setGameTime] = useState("00:00");
  const { gameWeek } = useGlobalContext();

  useEffect(() => {
    const utc = new Date(kickoffTime);
    setGameTime(
      utc.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      })
    );
    const targetTime = new Date(kickoffTime);
    const currentTime = new Date();
    if (targetTime < currentTime) {
      setTimePassed(true);
    } else {
      setTimePassed(false);
    }
  }, [kickoffTime]);

  const SetPoint = async (newPoint: number) => {
    const docRef = doc(
      db,
      `users/${auth.currentUser?.uid}/gameweeks/gw${gameWeek}/predictions/`,
      `match${gameNumber}`
    );
    setDoc(docRef, { point: newPoint }, { merge: true });
  };

  const CalculateWinState = () => {
    if (isTimePassed === false) return "Not Started";
    const isWin = score[0] > score[1];
    const isPredictWin = prediction[0] > prediction[1];
    const isDraw = score[0] === score[1];
    const isPredictDraw = prediction[0] === prediction[1];

    if (score[0] === parseInt(prediction[0]) && score[1] === parseInt(prediction[1])) {
      SetPoint(100);
      return "Exact";
    } else if (
      (isDraw === false && isPredictDraw === false && isWin === isPredictWin) ||
      (isDraw === true && isDraw === isPredictDraw)
    ) {
      SetPoint(50);
      return "Win";
    } else {
      SetPoint(0);
      return "Loss";
    }
  };

  return (
    <View style={styles.container}>
      <CardWinState
        winState={CalculateWinState()}
        isTimePassed={isTimePassed}
        kickoffTime={kickoffTime}
      />
      <View style={styles.dataContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: `https://resources.premierleague.com/premierleague/badges/70/t${
                teamData[homeTeam - 1].code
              }.png`,
            }}
            style={styles.image}
          />
          <TextSemi>{teamData[homeTeam - 1].short_name}</TextSemi>
        </View>
        <CardScore
          gameTime={gameTime}
          gameNumber={gameNumber}
          isTimePassed={isTimePassed}
          prediction={prediction}
          score={score}
        />
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: `https://resources.premierleague.com/premierleague/badges/70/t${
                teamData[awayTeam - 1].code
              }.png`,
            }}
            style={styles.image}
          />
          <TextSemi>{teamData[awayTeam - 1].short_name}</TextSemi>
        </View>
      </View>
      {/* {expandState && (
        <>
          <View style={styles.hr} />
          <View style={styles.resultContainer}>
            <TextBold style={styles.predictionScore}>{predictions[0]}</TextBold>
            <Text style={styles.pText}>Predictions</Text>
            <TextBold style={styles.predictionScore}>{predictions[1]}</TextBold>
          </View>
        </>
      )} */}
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
  dataContainer: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  logoContainer: {
    alignItems: "center",
  },

  resultContainer: {
    flexDirection: "row",
    justifyContent: "center",
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

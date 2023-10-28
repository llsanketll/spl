import React, { useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import TextSemi from "./Texts/TextSemi";
import TextLight from "./Texts/TestLight";
import TextBold from "./Texts/TextBold";
import TextRegular from "./Texts/TextRegular";

export type MatchCardProps = {
  homeTeam: number;
  awayTeam: number;
  teamData: TeamDataType[];
  isCurrent: boolean;
  kickoffTime: string;
  isEditMode: boolean;
  score: [number, number];
};
export type TeamDataType = {
  name: string;
  short_name: string;
  code: number;
};

function GetRandomRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function MatchCard({
  homeTeam,
  awayTeam,
  teamData,
  kickoffTime,
  isEditMode,
  score = [0, 0],
}: MatchCardProps) {
  const [isTimePassed, setTimePassed] = React.useState(false);
  const [gameTime, setGameTime] = React.useState("00:00");
  const [predictions, setPredictions] = React.useState([
    GetRandomRange(0, 5),
    GetRandomRange(0, 5),
  ]);

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

  const CalculateWinState = () => {
    const isWin = score[0] > score[1];
    const isPredictWin = predictions[0] > predictions[1];
    const isDraw = score[0] === score[1];
    const isPredictDraw = predictions[0] === predictions[1];
    if (score[0] === predictions[0] && score[1] === predictions[1]) {
      return "Exact";
    } else if (
      (isDraw === false && isPredictDraw === false && isWin === isPredictWin) ||
      (isDraw === true && isDraw === isPredictDraw)
    ) {
      return "Win";
    } else return "Loss";
  };

  const RenderWinState = () => {
    const win = CalculateWinState();
    if (!isTimePassed)
      return (
        <TextRegular style={styles.dateText}>
          {`${new Date(kickoffTime).getDate()} ${new Date(
            kickoffTime
          ).toLocaleDateString("default", { month: "short" })}`}
        </TextRegular>
      );
    if (win === "Exact") {
      return <TextRegular style={styles.exact}>{win}</TextRegular>;
    } else if (win === "Win") {
      return <TextRegular style={styles.win}>{win}</TextRegular>;
    } else return <TextRegular style={styles.loss}>{win}</TextRegular>;
  };

  const RenderScoreElement = () => {
    if (isEditMode)
      return (
        <View style={styles.scoreContainer}>
          <TextInput
            keyboardType="number-pad"
            defaultValue="0"
            style={styles.predictionScore}></TextInput>
          <TextBold size={30}> : </TextBold>
          <TextInput
            keyboardType="number-pad"
            defaultValue="0"
            style={styles.predictionScore}></TextInput>
        </View>
      );
    {
      if (isTimePassed)
        return (
          <View style={styles.middleContainer}>
            <TextBold style={styles.scoreText}>
              {score[0]} : {score[1]}
            </TextBold>
            <TextLight color="gray">{`Prediction: ${predictions[0]}-${predictions[1]}`}</TextLight>
          </View>
        );
      else
        return (
          <View style={styles.middleContainer}>
            <TextBold style={styles.timeText}>{gameTime}</TextBold>
            <TextLight color="gray">{`Prediction: ${predictions[0]}-${predictions[1]}`}</TextLight>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      {RenderWinState()}
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
        {RenderScoreElement()}
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
  middleContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginHorizontal: 20,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  resultContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  exact: {
    position: "absolute",
    textAlign: "center",
    backgroundColor: "#0EB163",
    color: "white",
    top: 0,
    left: "50%",
    transform: [{ translateX: -30 }],
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: 60,
    paddingBottom: 5,
  },
  win: {
    position: "absolute",
    textAlign: "center",
    backgroundColor: "#7494ff",
    color: "white",
    top: 0,
    left: "50%",
    transform: [{ translateX: -30 }],
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: 60,
    paddingBottom: 5,
  },
  loss: {
    position: "absolute",
    textAlign: "center",
    backgroundColor: "#fc4646",
    color: "white",
    top: 0,
    left: "50%",
    transform: [{ translateX: -30 }],
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: 65,
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  dateText: {
    position: "absolute",
    textAlign: "center",
    backgroundColor: "#6e6e6e",
    color: "white",
    top: 0,
    left: "50%",
    transform: [{ translateX: -30 }],
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: 65,
    paddingHorizontal: 10,
    paddingBottom: 5,
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
  scoreText: {
    fontSize: 35,
    fontFamily: "Poppins SemiBold",
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
  pText: {
    marginHorizontal: 20,
    fontFamily: "Poppins Light",
  },
});

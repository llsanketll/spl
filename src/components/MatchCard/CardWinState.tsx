import React, { useState } from "react";
import TextRegular from "../Texts/TextRegular";
import { StyleSheet } from "react-native";

type CardWinStateProps = {
  winState: string;
  isTimePassed: boolean;
  kickoffTime: string;
};

export default function CardWinState({ winState, isTimePassed, kickoffTime }: CardWinStateProps) {
  if (!isTimePassed)
    return (
      <TextRegular style={styles.dateText}>
        {`${new Date(kickoffTime).getDate()} ${new Date(kickoffTime).toLocaleDateString("default", {
          month: "short",
        })}`}
      </TextRegular>
    );
  if (winState === "Exact") {
    return <TextRegular style={styles.exact}>{winState}</TextRegular>;
  } else if (winState === "Win") {
    return <TextRegular style={styles.win}>{winState}</TextRegular>;
  } else return <TextRegular style={styles.loss}>{winState}</TextRegular>;
}

const styles = StyleSheet.create({
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
    backgroundColor: "#FCC027",
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
});

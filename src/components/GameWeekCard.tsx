import { View } from "moti";
import React, { useEffect, useId, useState } from "react";
import { StyleSheet } from "react-native";
import TextRegular from "./Texts/TextRegular";
import TextBold from "./Texts/TextBold";
import { collection, getDocs } from "firebase/firestore";
import { db } from "firebase.config";

type GameWeekCardProps = {
  userID: string;
  gw: number;
};

export default function GameWeekCard(props: GameWeekCardProps) {
  const [rank, setRank] = useState(Math.floor(Math.random() * 5) + 1);
  const [gwPoints, setGWPoints] = useState(0);

  const CalculateGWPoints = async (uID: string, gw: number) => {
    let points = 0;
    const querySnapshot = await getDocs(
      collection(db, `users/${uID}/gameweeks/gw${gw}/predictions`)
    );
    if (!querySnapshot.empty)
      querySnapshot.forEach(doc => {
        points += doc.data()?.point;
      });
    return points;
  };

  useEffect(() => {
    CalculateGWPoints(props.userID, props.gw).then(point => {
      setGWPoints(point);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={rank === 1 ? { ...styles.topBlock, backgroundColor: "#00B163" } : styles.topBlock}>
        <TextBold color="white" size={12} center>
          Week - {props.gw}
        </TextBold>
      </View>
      <View style={styles.dataContainer}>
        <TextRegular>
          Rank - <TextBold>{rank}</TextBold>
        </TextRegular>
        <TextRegular color="gray">GW Points</TextRegular>
        <TextBold size={20}>{gwPoints}</TextBold>
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
    width: 140,
  },
  topBlock: {
    position: "absolute",
    top: 0,
    alignSelf: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "gray",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  greenBlock: {
    backgroundColor: "#00B163",
  },
  dataContainer: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  hr: {
    borderBottomWidth: 1,
    borderBottomColor: "#acacac",
    margin: 20,
  },
});

import { Button, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "firebase.config";
import { StackScreenProps } from "@/types/route_types";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import TextBold from "@/components/Texts/TextBold";
import { StyleSheet } from "react-native";
import TextLight from "@/components/Texts/TestLight";
import TextRegular from "@/components/Texts/TextRegular";
import LoadingCard from "@/components/MatchCard/LoadingCard";
import GameWeekCard from "@/components/GameWeekCard";
import { ScrollView } from "moti";
import { useGlobalContext } from "@/components/Global/GlobalContext";
import DropDown from "@/components/DropDown/DropDown";
import SPLFooter from "@/components/SPLFooter";
import SPLHeader from "@/components/SPLHeader";

export default function ProfileScreen(props: StackScreenProps<"Profile">) {
  const { userID } = props.route.params;
  const { currentWeek } = useGlobalContext();
  const [userName, setUsername] = React.useState("");
  const [gwPoints, setGWPoints] = React.useState(0);
  const [totalPoints, setTotalPoints] = React.useState(0);

  const GetUserName = async () => {
    const docRef = doc(db, "users", userID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUsername(docSnap.data().username);
    } else {
      console.log("No such document!");
    }
  };
  useEffect(() => {
    GetUserName();
    CalculateGWPoints(userID, currentWeek).then(point => {
      CalculateTotal([point]);
      setGWPoints(point);
    });
  }, []);

  const CalculateTotal = (points: number[]) => {
    let total = 0;
    points.forEach(point => {
      total += point;
    });
    return total;
  };
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
  const OnLogoutPressed = async () => {
    await signOut(auth);
    props.navigation.navigate("Landing");
  };
  return (
    <>
      <SPLHeader name={userName} />
      <View style={styles.container}>
        <View style={{ flexDirection: "row", justifyContent: "flex-end", gap: 80 }}>
          <DropDown />
        </View>
        <View style={styles.dataList}>
          <View style={styles.dataContainer}>
            <TextBold size={16}>1</TextBold>
            <TextRegular color="gray">Wins</TextRegular>
          </View>
          <View style={styles.totalContainer}>
            <TextBold size={30}>1050</TextBold>
            <TextRegular color="gray">Total</TextRegular>
          </View>
          <View style={styles.dataContainer}>
            <TextBold size={16}>{gwPoints}</TextBold>
            <TextRegular color="gray">GW Points</TextRegular>
          </View>
        </View>
        <View style={styles.hr} />
        <ScrollView
          style={styles.cardContainer}
          contentContainerStyle={{
            flexDirection: "row",
            width: "100%",
            gap: 30,
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}>
          <GameWeekCard userID={userID} gw={9} />
          <GameWeekCard userID={userID} gw={10} />
          <GameWeekCard userID={userID} gw={11} />
        </ScrollView>
        {/* <Button title="Logout" onPress={OnLogoutPressed} /> */}
      </View>

      <SPLFooter {...props} />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  cardContainer: {},
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    marginBottom: 20,
  },
  dataList: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginVertical: 20,
  },
  totalContainer: {
    width: "33%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e6e6e6",
  },
  dataContainer: {
    width: "33%",
    alignItems: "center",
    justifyContent: "center",
  },
});

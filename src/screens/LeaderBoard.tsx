import { Col, Row, Table } from "react-native-table-component";
import TextSemi from "@/components/Texts/TextSemi";
import { StackScreenProps } from "@/types/route_types";
import { View } from "moti";
import React, { useEffect, useState } from "react";
import { StyleSheet, Touchable, TouchableOpacity } from "react-native";
import TextRegular from "@/components/Texts/TextRegular";
import { collection, doc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "firebase.config";
import SPLFooter from "@/components/SPLFooter";

type UserDataType = [
  username: (name: string, uID: string) => TouchableOpacity,
  gwPoints: number,
  totalPoints: number
];

export default function LeaderBoard(props: StackScreenProps<"LeaderBoard">) {
  const SortData = (index: number) => {
    const sortedArray = [...userData].sort((a, b) => (a[index] > b[index] ? -1 : 1));
    setUserData(sortedArray);
  };
  const headerButton = (value: string, index: number) => (
    <TouchableOpacity onPress={() => SortData(index)}>
      <TextRegular style={{ ...styles.headerText, textDecorationLine: "underline" }}>
        {value}
      </TextRegular>
    </TouchableOpacity>
  );

  const nameButton = (name: string, uID: string) => (
    <TouchableOpacity onPress={() => props.navigation.navigate("Profile", { userID: uID })}>
      <TextRegular style={{ ...styles.tableText, textDecorationLine: "underline" }}>
        {name}
      </TextRegular>
    </TouchableOpacity>
  );
  const heading = ["#", "Username", "Wins", headerButton("Exact", 2), headerButton("GW", 3)];
  const [userData, setUserData] = useState([
    ["Sanket", 4, 1, 300],
    ["Angel", 4, 3, 500],
    ["Sushant", 1, 2, 250],
    ["Niranjan", 3, 3, 450],
    ["Subham", 1, 4, 450],
    ["Rabin", 2, 2, 300],
  ]);

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

  const GetUserList = async () => {
    const userList: any = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    if (!querySnapshot.empty) {
      const gwPromises: Promise<number>[] = [];
      querySnapshot.forEach(user => {
        gwPromises.push(CalculateGWPoints(user.id, 10));
      });
      Promise.all(gwPromises).then(gwPoints => {
        let i = 0;
        querySnapshot.forEach(user => {
          userList.push([nameButton(user.data().username, user.id), 5, 1, gwPoints[i]]);
          i++;
        });
        setUserData(userList);
      });
    }
  };
  useEffect(() => {
    GetUserList();
  }, []);
  return (
    <>
      <View style={styles.container}>
        <TextSemi size={24} color="#27384C">
          Hell's Paradise
        </TextSemi>
        <Table borderStyle={{ borderWidth: 2, borderColor: "#efefef" }}>
          <Row
            data={heading}
            style={styles.tableHeader}
            flexArr={[1, 3, 2, 2, 2]}
            textStyle={styles.headerText}
          />
          {userData.map((rowData, index) => (
            <Row
              data={[index + 1, ...rowData]}
              flexArr={[1, 3, 2, 2, 2]}
              textStyle={styles.tableText}
              style={styles.row}
              key={index}
            />
          ))}
        </Table>
      </View>

      <SPLFooter {...props} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
  },
  row: {
    height: 40,
  },
  tableHeader: { height: 40, backgroundColor: "#27384C" },
  headerText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Poppins SemiBold",
    color: "white",
  },
  tableText: { textAlign: "center", fontFamily: "Poppins" },
});

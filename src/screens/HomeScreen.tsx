import SPLFooter from "@/components/SPLFooter";
import SPLHeader from "@/components/SPLHeader";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import type { StackScreenProps } from "@/types/route_types";
import TextSemi from "@/components/Texts/TextSemi";
import MatchCard, { MatchCardProps } from "@/components/MatchCard";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

export default function HomeScreen({ navigation }: StackScreenProps<"Home">) {
  const [fixtureData, setFixtureData] = useState<MatchCardProps[]>([]);
  const [gameWeek, setGameWeek] = useState(1);
  const [currentWeek, setCurrentWeek] = useState(10);
  const [isEditMode, setIsEditMode] = useState(false);

  const GetCurrentGameWeek = async () => {
    try {
      const res = await fetch(
        "https://fantasy.premierleague.com/api/bootstrap-static/"
      );
      const teamData = await res.json();
      let currentWeek = teamData.events[0].id;
      teamData.events.forEach((item: any) => {
        if (item.is_current) currentWeek = item.id;
      });
      setCurrentWeek(currentWeek);
      setGameWeek(currentWeek);
    } catch (error) {
      return 1;
    }
  };

  const GetFixtureData = async () => {
    try {
      const response = await fetch(
        "https://fantasy.premierleague.com/api/fixtures/?event=" + gameWeek
      );
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetCurrentGameWeek();
  }, []);

  useEffect(() => {
    fetch("https://fantasy.premierleague.com/api/bootstrap-static/").then(
      res => {
        res.json().then(teamData => {
          GetFixtureData().then(data => {
            const newData: MatchCardProps[] = data.map((item: any) => ({
              homeTeam: item.team_h,
              awayTeam: item.team_a,
              isCurrent: item.is_current,
              kickoffTime: item.kickoff_time,
              score: [item.team_h_score, item.team_a_score],
              teamData: teamData.teams,
            }));
            setFixtureData([...newData]);
          });
        });
      }
    );
  }, [gameWeek]);

  const RenderEditButton = () => {
    if (gameWeek > currentWeek) {
      if (isEditMode !== true)
        return (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditMode(true)}>
            <Entypo name="pencil" size={24} color="white" />
          </TouchableOpacity>
        );
      else
        return (
          <TouchableOpacity
            style={styles.checkButton}
            onPress={() => setIsEditMode(false)}>
            <Entypo name="check" size={24} color="white" />
          </TouchableOpacity>
        );
    } else return null;
  };
  const ChangeGameWeek = (increment: number) => {
    setIsEditMode(false);
    setGameWeek(gameWeek + increment);
  };
  return (
    <>
      <SPLHeader />
      <View style={styles.container}>
        {RenderEditButton()}
        <View style={styles.gameweekContainer}>
          <TouchableOpacity
            style={styles.arrowContainer}
            onPress={() => ChangeGameWeek(-1)}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
          <TextSemi>{`️  Game Week ${gameWeek}`}</TextSemi>
          <TouchableOpacity
            style={styles.arrowContainer}
            onPress={() => ChangeGameWeek(1)}>
            <AntDesign name="arrowright" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.cardContainer}
          data={fixtureData}
          renderItem={({ item }) => (
            <MatchCard
              homeTeam={item.homeTeam}
              awayTeam={item.awayTeam}
              isCurrent={item.isCurrent}
              kickoffTime={item.kickoffTime}
              score={[item.score[0], item.score[1]]}
              isEditMode={isEditMode}
              teamData={item.teamData}
            />
          )}></FlatList>
        <StatusBar style="auto" />
      </View>
      <SPLFooter />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    position: "relative",
  },
  cardContainer: {
    flex: 1,
    marginTop: 20,
    paddingBottom: 20,
    marginBottom: 60,
  },
  arrowContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#506BFA",
  },
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
    backgroundColor: "#03C988",
  },
  gameweekContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

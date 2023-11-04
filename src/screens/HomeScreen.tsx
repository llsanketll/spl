import SPLFooter from "@/components/SPLFooter";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import type { StackScreenProps } from "@/types/route_types";
import TextSemi from "@/components/Texts/TextSemi";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import EditButton from "@/components/EditButton";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "firebase.config";
import SPLHeader from "@/components/SPLHeader";
import { useGlobalContext } from "@/components/Global/GlobalContext";
import FixtureList from "@/components/FixtureList";
import LoadingCard from "@/components/MatchCard/LoadingCard";
import { MatchCardProps } from "@/components/MatchCard/MatchCard";

export default function HomeScreen(props: StackScreenProps<"Home">) {
  const { isLoading, setIsLoading } = useGlobalContext();
  const [fixtureData, setFixtureData] = useState<MatchCardProps[]>([]);
  const [predictions, setPredictions] = useState<[string, string][]>(Array(10).fill(["0", "0"]));
  const { gameWeek, setGameWeek } = useGlobalContext();
  const { currentWeek, setCurrentWeek } = useGlobalContext();
  const { setIsEditMode } = useGlobalContext();
  const { setCanUpload } = useGlobalContext();
  const { setPoints } = useGlobalContext();

  const UploadPrediction = async () => {
    setCanUpload(true);
    setIsEditMode(false);
  };

  const GetTeamData = async () => {
    try {
      const res = await fetch("https://fantasy.premierleague.com/api/bootstrap-static/");
      const teamData = await res.json();
      return teamData;
    } catch (error) {
      console.log("Error Getting Team Data: ", error);
      throw error;
    }
  };

  const GetCurrentGameWeek = async () => {
    try {
      let currentWeek = 1;
      const res = await fetch("https://fantasy.premierleague.com/api/bootstrap-static/");
      const teamData = await res.json();
      teamData.events.forEach((item: any) => {
        if (item.is_current) currentWeek = item.id;
      });
      return currentWeek;
    } catch (error) {
      throw error;
    }
  };

  const GetFixtureData = async (gw: number) => {
    try {
      const response = await fetch("https://fantasy.premierleague.com/api/fixtures/?event=" + gw);
      const json = await response.json();
      const teamData = await GetTeamData();
      const newData: MatchCardProps[] = json.map((item: any, index: number) => ({
        gameNumber: index,
        homeTeam: item.team_h,
        awayTeam: item.team_a,
        isCurrent: item.is_current,
        kickoffTime: item.kickoff_time,
        score: [item.team_h_score, item.team_a_score],
        teamData: teamData.teams,
      }));
      return newData;
    } catch (error) {
      console.log("Error Getting Data: ", error);
      throw error;
    }
  };

  const GetPredictions = async (gw: number) => {
    try {
      let weekPredictions: [string, string][] = [];
      const querySnapshot = await getDocs(
        collection(db, `users/${auth.currentUser?.uid}/gameweeks/gw${gw}/predictions`)
      );
      if (!querySnapshot.empty)
        querySnapshot.forEach(doc => {
          weekPredictions.push(doc.data()?.prediction);
        });
      else weekPredictions = Array(fixtureData.length).fill(["0", "0"]);
      return weekPredictions;
    } catch (error) {
      console.log("Error Getting Predictions: ", error);
      throw error;
    }
  };

  const SetGameWeekData = async (newGameWeek: number) => {
    setGameWeek(newGameWeek);
    try {
      const newFixture = await GetFixtureData(newGameWeek);
      setFixtureData(newFixture);

      const newPredictions = await GetPredictions(newGameWeek);
      setPredictions(newPredictions);
    } catch (error) {
      console.log("Error: ", error);
      throw error;
    }
  };

  const CalculateGWPoints = async (gw: number) => {
    let points = 0;
    const querySnapshot = await getDocs(
      collection(db, `users/${auth.currentUser?.uid}/gameweeks/gw${gw}/predictions`)
    );
    if (!querySnapshot.empty)
      querySnapshot.forEach(doc => {
        points += doc.data()?.point;
      });
    setPoints(points);
  };

  useEffect(() => {
    GetCurrentGameWeek()
      .then(currWeek => {
        setCurrentWeek(currWeek);
        SetGameWeekData(currWeek).then(() => {
          CalculateGWPoints(currWeek);
          setIsLoading(false);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const OnGameWeekChange = async (increment: number) => {
    setIsLoading(true);
    setPoints(0);
    const newGameWeek = gameWeek + increment;
    setIsEditMode(false);

    await SetGameWeekData(newGameWeek);
    await CalculateGWPoints(newGameWeek);
    setIsLoading(false);
  };

  return (
    <>
      <SPLHeader name="zolt" />
      <View style={styles.container}>
        <EditButton UploadPrediction={UploadPrediction} />
        <View style={styles.gameweekContainer}>
          <TouchableOpacity
            style={gameWeek === 1 ? styles.arrowContainerDisabled : styles.arrowContainer}
            disabled={gameWeek === 1}
            onPress={() => OnGameWeekChange(-1)}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
          <TextSemi>{`️  Game Week ${gameWeek}`}</TextSemi>
          <TouchableOpacity
            style={
              gameWeek === currentWeek + 1 ? styles.arrowContainerDisabled : styles.arrowContainer
            }
            disabled={gameWeek === currentWeek + 1}
            onPress={() => OnGameWeekChange(1)}>
            <AntDesign name="arrowright" size={24} color="white" />
          </TouchableOpacity>
        </View>
        {isLoading ? (
          <View style={{ flex: 1, marginTop: 10, paddingBottom: 20, marginBottom: 60 }}>
            {Array.from(Array(6).keys()).map((item, index) => (
              <LoadingCard key={index} />
            ))}
          </View>
        ) : (
          <FixtureList fixtureData={fixtureData} predictions={predictions} />
        )}

        {/* <StatusBar style="auto" /> */}
      </View>
      <SPLFooter {...props} />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    position: "relative",
  },

  arrowContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#506BFA",
  },
  arrowContainerDisabled: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "gray",
  },
  gameweekContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

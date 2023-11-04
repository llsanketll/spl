import React from "react";
import MatchCard, { MatchCardProps } from "./MatchCard/MatchCard";
import { ScrollView, StyleSheet } from "react-native";
import { useGlobalContext } from "./Global/GlobalContext";

type FixtureListProps = {
  fixtureData: MatchCardProps[];
  predictions: [string, string][];
};

export default function FixtureList(props: FixtureListProps) {
  return (
    <ScrollView style={styles.cardContainer}>
      {props.fixtureData.map((item, index) => (
        <MatchCard
          homeTeam={item.homeTeam}
          awayTeam={item.awayTeam}
          gameNumber={item.gameNumber}
          isCurrent={item.isCurrent}
          kickoffTime={item.kickoffTime}
          prediction={props.predictions[index]}
          score={item.score}
          teamData={item.teamData}
          key={index}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    marginTop: 10,
    paddingBottom: 20,
    marginBottom: 60,
  },
});

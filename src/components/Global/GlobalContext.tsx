import { isLoaded } from "expo-font";
import React, { ReactNode, createContext, useContext, useState } from "react";

export type GlobalContent = {
  gameWeek: number;
  currentWeek: number;
  points: number;
  isEditMode: boolean;
  canUpload: boolean;
  isLoading: boolean;
  currentScreen: string;
  setCurrentScreen: (currentScreen: "Fixture" | "Leaderboard" | "Profile") => void;
  setIsLoading: (isLoading: boolean) => void;
  setCanUpload: (canUpload: boolean) => void;
  setGameWeek: (gameWeek: number) => void;
  setCurrentWeek: (currentWeek: number) => void;
  setPoints: (points: number) => void;
  setIsEditMode: (isEditMode: boolean) => void;
};

const GlobalContext = createContext<GlobalContent>({
  gameWeek: 1,
  currentWeek: 1,
  points: 0,
  isEditMode: false,
  canUpload: false,
  isLoading: true,
  currentScreen: "Fixtures",
  setCurrentScreen: currentScreen => {},
  setIsLoading: isLoading => {},
  setCanUpload: canUpload => {},
  setIsEditMode: isEditMode => {},
  setGameWeek: gameWeek => {},
  setCurrentWeek: currentWeek => {},
  setPoints: points => {},
});

function GlobalProvider({ children }: { children: ReactNode }) {
  const [gameWeek, setGameWeek] = useState(1);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [points, setPoints] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [canUpload, setCanUpload] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState("Fixtures");
  return (
    <GlobalContext.Provider
      value={{
        gameWeek,
        setGameWeek,
        currentWeek,
        setCurrentWeek,
        points,
        setPoints,
        currentScreen,
        setCurrentScreen,
        isLoading,
        setIsLoading,
        isEditMode,
        setIsEditMode,
        canUpload,
        setCanUpload,
      }}>
      {children}
    </GlobalContext.Provider>
  );
}

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };

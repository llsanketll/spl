import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import HomeScreen from "@/screens/HomeScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import LandingScreen from "@/screens/LandingScreen";
import LeaderBoard from "@/screens/LeaderBoard";
import { auth } from "firebase.config";
import { createGlobalState } from "react-hooks-global-state";
import { GlobalProvider } from "@/components/Global/GlobalContext";

export type RootStackParamList = {
  Home: undefined;
  Landing: undefined;
  LeaderBoard: undefined;
  Profile: { userID: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [loaded] = useFonts({
    "Poppins": require("assets/fonts/Poppins-Regular.ttf"),
    "Poppins Bold": require("assets/fonts/Poppins-Bold.ttf"),
    "Poppins SemiBold": require("assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins Light": require("assets/fonts/Poppins-Light.ttf"),
  });
  if (!loaded) return null;

  return (
    <GlobalProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={auth.currentUser ? "Home" : "Landing"}>
          <Stack.Screen
            name="Landing"
            component={LandingScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              headerShown: false,
              // headerStyle: { backgroundColor: "#506BFA" },
              // headerTintColor: "white",
              // headerTitleStyle: { fontFamily: "Poppins Bold", color: "white" },
            }}
          />
          <Stack.Screen
            name="LeaderBoard"
            component={LeaderBoard}
            options={{
              headerStyle: { backgroundColor: "#506BFA" },
              headerTintColor: "white",
              headerTitleStyle: { fontFamily: "Poppins Bold", color: "white" },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalProvider>
  );
}

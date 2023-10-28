import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import HomeScreen from "@/screens/HomeScreen";
import ProfileScreen from "@/screens/ProfileScreen";

export type RootStackParamList = {
  Home: undefined;
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
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

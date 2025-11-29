import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import TimerScreen from "./screens/TimerScreen";
import HistoryScreen from "./screens/HistoryScreen";
import WeeklySummaryScreen from "./screens/WeeklySummaryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SoundSettingsScreen from "./screens/SoundSettingsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#6C63FF",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Meditation App" }}
        />
        <Stack.Screen
          name="Timer"
          component={TimerScreen}
          options={{ title: "Meditation Timer" }}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{ title: "Meditation History" }}
        />
        <Stack.Screen
          name="Summary"
          component={WeeklySummaryScreen}
          options={{ title: "Weekly Summary" }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: "Profile" }}
        />
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: "Register" }}
        />
        <Stack.Screen
          name="SoundSettings"
          component={SoundSettingsScreen}
          options={{ title: "Sound Settings" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

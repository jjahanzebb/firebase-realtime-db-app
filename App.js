import {} from "react-native";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ title: "CRUD Operations App" }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTitleAlign: "center",
            headerShadowVisible: false,
          }}
        />

        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerTitleAlign: "center",
            headerShadowVisible: false,
          }}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitleAlign: "center",
            headerShadowVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

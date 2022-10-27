import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

import tailwind from "twrnc";
import {
  ref,
  push,
  child,
  set,
  update,
  onValue,
  remove,
} from "firebase/database";
import { db } from "../components/config";

const Login = ({ navigation }) => {
  // tailwind styles
  const container = "flex-1 -mt-8 bg-white items-center justify-center";
  const textBoxes =
    "bg-slate-100 w-9/12 px-3 py-2 my-1 border-gray-400 border rounded-3";
  const h1 = "text-2xl font-bold";
  const h2 = "text-sm mb-4";
  const button =
    "bg-cyan-600 w-6/12 items-center rounded-3 py-3 mt-4 shadow-md";
  const buttonText = "text-base text-white ";

  // for managing data
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // for reading data
  const loginCheck = async () => {
    if (username !== "") {
      const dataRef = ref(db, "users/" + username);
      await onValue(dataRef, (snapshot) => {
        const data = snapshot.val();

        if (data !== null) {
          Alert.alert(
            "Found your Password!",
            "Your password is: " + data.password
          );
          console.log("Login SUCCESS! =>", data);
          setUsername("");
          setPassword("");
        } else {
          Alert.alert("Invalid Username", "no such user found");
        }
      });
    } else {
      Alert.alert("Wrong Details!", "Please enter your username..");
    }
  };

  return (
    // container
    <View style={tailwind.style`${container}`}>
      <Text style={tailwind.style`${h1}`}>Login</Text>
      <Text style={tailwind.style`${h2}`}>Firebase Realtime Database</Text>

      {/* textBoxes */}
      <TextInput
        value={username}
        onChangeText={(text) => {
          setUsername(text);
        }}
        placeholder="Username"
        style={tailwind.style`${textBoxes}`}
      />
      <TextInput
        value={password}
        onChangeText={(text) => {
          setPassword(text);
        }}
        placeholder="Password"
        style={tailwind.style`${textBoxes}`}
        secureTextEntry
      />

      {/* button - add */}
      <TouchableOpacity
        onPress={loginCheck}
        style={tailwind.style`${button} `}
        activeOpacity={0.5}
      >
        {/* buttonText */}
        <Text style={tailwind.style`${buttonText}`}>Login</Text>
      </TouchableOpacity>

      {/* textButton - register */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        style={tailwind.style`${""} mt-2 flex-row`}
        activeOpacity={0.5}
      >
        <Text style={tailwind.style`${""} `}>Don't have an account?</Text>

        <Text style={tailwind.style`${""} ml-1 font-bold text-cyan-600`}>
          Register now
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

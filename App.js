import { Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

import tailwind from "twrnc";
import { ref, set } from "firebase/database";
import { db } from "./components/config";

const App = () => {
  // tailwind styles
  const container = "flex-1 bg-white items-center justify-center";
  const textBoxes =
    "bg-slate-100 w-9/12 px-3 py-2 my-1 border-gray-400 border rounded-3";
  const h1 = "text-2xl font-bold";
  const h2 = "text-sm mb-4";
  const button = "bg-cyan-600 w-6/12 items-center rounded-3 py-3 mt-4 ";
  const buttonText = "text-base text-white ";

  // for managing data
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // for creating/updating data
  const create = async () => {
    await set(ref(db, "users/" + username), {
      username: username,
      email: email,
      password: password,
    })
      .then((result) => {
        // if Data create/update is successful
        console.log("Update SUCCESS! =>", JSON.stringify(result));
        setUsername("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        // if Data create/update is failed
        console.log("Update FAIL.. =>", error);
      });
  };

  return (
    // container
    <View style={tailwind.style`${container}`}>
      <Text style={tailwind`${h1}`}>CRUD Operations App</Text>
      <Text style={tailwind`${h2}`}>Firebase Realtime Database</Text>

      {/* textBoxes */}
      <TextInput
        value={username}
        onChangeText={(text) => {
          setUsername(text);
        }}
        placeholder="Username"
        style={tailwind`${textBoxes}`}
      />
      <TextInput
        value={email}
        onChangeText={(text) => {
          setEmail(text);
        }}
        placeholder="Email"
        style={tailwind`${textBoxes}`}
      />
      <TextInput
        value={password}
        onChangeText={(text) => {
          setPassword(text);
        }}
        placeholder="Password"
        style={tailwind`${textBoxes}`}
        secureTextEntry
      />

      {/* button */}
      <TouchableOpacity
        onPress={create}
        style={tailwind`${button}`}
        activeOpacity={0.5}
      >
        {/* buttonText */}
        <Text style={tailwind`${buttonText}`}>Submit Data</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

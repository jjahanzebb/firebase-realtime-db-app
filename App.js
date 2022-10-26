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

  // for creating data
  const createData = async () => {
    // Get a unique key for a new User
    // const userid = push(child(ref(db), "users")).key;

    if (username !== "" && email !== "" && password !== "") {
      await set(ref(db, "users/" + username), {
        // userid: userid,
        username: username,
        email: email,
        password: password,
      })
        .then((result) => {
          // if Data create is successful
          console.log("Create SUCCESS! =>", result.message);
          setUsername("");
          setEmail("");
          setPassword("");
        })
        .catch((error) => {
          // if Data create is failed
          console.log("Create FAIL.. =>", error.message);
        });
    } else {
      Alert.alert("Wrong Details!", "Please fill out all details..");
    }
  };

  // for updating data
  const updateData = async () => {
    if (username !== "" && email !== "" && password !== "") {
      await update(ref(db, "users/" + username), {
        username: username,
        email: email,
        password: password,
      })
        .then((result) => {
          // if Data update is successful
          console.log("Update SUCCESS! =>", result.message);
          setUsername("");
          setEmail("");
          setPassword("");
        })
        .catch((error) => {
          // if Data update is failed
          console.log("Update FAIL.. =>", error.message);
        });
    } else {
      Alert.alert("Wrong Details!", "Please fill out all details..");
    }
  };

  // for reading data
  const readData = async () => {
    if (username !== "") {
      const dataRef = ref(db, "users/" + username);
      await onValue(dataRef, (snapshot) => {
        const data = snapshot.val();

        if (data !== null) {
          Alert.alert(
            "Found your Password!",
            "Your password is: " + data.password
          );
          setUsername("");
          setEmail("");
          setPassword("");
        } else {
          Alert.alert("Invalid Username", "no such user found");
        }
      });
    } else {
      Alert.alert("Wrong Details!", "Please enter your username..");
    }
  };

  // for deleting data
  const deleteData = async () => {
    if (username !== "") {
      await remove(ref(db, "users/" + username))
        .then((result) => {
          console.log("Delete SUCCESSFUL! => ", result.message);
          setUsername("");
          setEmail("");
          setPassword("");
        })
        .catch((error) => {
          console.log("Delete FAIL.. =>", error.message);
        });
    } else {
      Alert.alert("Wrong Details!", "Please enter your username..");
    }
  };

  return (
    // container
    <View style={tailwind.style`${container}`}>
      <Text style={tailwind.style`${h1}`}>CRUD Operations App</Text>
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
        value={email}
        onChangeText={(text) => {
          setEmail(text);
        }}
        placeholder="Email"
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
        onPress={createData}
        style={tailwind.style`${button}`}
        activeOpacity={0.5}
      >
        {/* buttonText */}
        <Text style={tailwind.style`${buttonText}`}>Submit Data</Text>
      </TouchableOpacity>

      {/* button - read */}
      <TouchableOpacity
        onPress={readData}
        style={tailwind.style`${button}`}
        activeOpacity={0.5}
      >
        {/* buttonText */}
        <Text style={tailwind.style`${buttonText}`}>Read Data</Text>
      </TouchableOpacity>

      {/* button - delete */}
      <TouchableOpacity
        onPress={deleteData}
        style={tailwind.style`${button}`}
        activeOpacity={0.5}
      >
        {/* buttonText */}
        <Text style={tailwind.style`${buttonText}`}>Delete Data</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

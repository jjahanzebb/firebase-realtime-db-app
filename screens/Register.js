import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

import tailwind from "twrnc";
import { ref, set, onValue } from "firebase/database";
import { db } from "../components/config";
import validator from "validator";

const Register = ({ navigation }) => {
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // for creating data
  const registerAccount = async () => {
    // Get a unique key for a new User
    // const userid = push(child(ref(db), "users")).key;

    if (
      username === "" &&
      email === "" &&
      password === "" &&
      confirmPassword === ""
    ) {
      Alert.alert("Invalid Details!", "Please fill out all details..");
    } else if (
      username.length < 6 ||
      username.includes("." || "#" || "$" || "[" || "]")
    ) {
      Alert.alert(
        "Invalid Details!",
        `Username should be 6 characters long and can't contain ".", "#", "$", "[", or "]"..`
      );
    } else if (!validator.isEmail(email)) {
      Alert.alert("Invalid Details!", "Enter a valid email..");
    } else if (password.length < 6) {
      Alert.alert("Invalid Details!", `Password should be 6 characters long..`);
    } else if (password !== confirmPassword) {
      Alert.alert("Invalid Passwords", "Passwords do not match..");
    } else {
      var checkAccount = false;

      const dataRef = ref(db, "users/" + username);
      await onValue(dataRef, (snapshot) => {
        const data = snapshot.val();

        if (data !== null && data.username === username) {
          checkAccount = true;
        } else {
          checkAccount = false;
        }
      });

      if (checkAccount) {
        console.log("checkAccount => ", checkAccount);

        checkAccount = false;
        Alert.alert(
          "Account Already Exists",
          "This username already exist, enter new one.."
        );
      } else {
        await set(ref(db, "users/" + username), {
          username: username,
          email: email,
          password: password,
        })
          .then((result) => {
            // if User registration is successful
            console.log("Create SUCCESS! =>", JSON.stringify(result));
            setUsername("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            checkAccount = false;
            navigation.navigate("Login", {
              username: username,
              password: password,
            });
          })
          .catch((error) => {
            // if User registration is failed
            console.log("Registration FAIL.. =>", error.message);
          });
      }
    }
  };

  // for reading data
  const checkAccount = async () => {
    if (username !== "") {
      const dataRef = ref(db, "users/" + username);
      await onValue(dataRef, (snapshot) => {
        const data = snapshot.val();

        if (data !== null && data.username === username) {
          return true;
        } else {
          return false;
        }
      });
    } else {
      Alert.alert("Wrong Details!", "Please enter your username..");
    }
  };

  return (
    // container
    <View style={tailwind.style`${container}`}>
      <Text style={tailwind.style`${h1}`}>Register</Text>
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

      <TextInput
        value={confirmPassword}
        onChangeText={(text) => {
          setConfirmPassword(text);
        }}
        placeholder="Confirm Password"
        style={tailwind.style`${textBoxes}`}
        secureTextEntry
      />

      {/* button - add */}
      <TouchableOpacity
        onPress={registerAccount}
        style={tailwind.style`${button} `}
        activeOpacity={0.5}
      >
        {/* buttonText */}
        <Text style={tailwind.style`${buttonText}`}>Register</Text>
      </TouchableOpacity>

      {/* textButton - register */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        style={tailwind.style`${""} mt-2 flex-row`}
        activeOpacity={0.5}
      >
        <Text style={tailwind.style`${""} `}>Already have an account?</Text>

        <Text style={tailwind.style`${""} ml-1 font-bold text-cyan-600`}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;

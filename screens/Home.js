import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

const Home = ({ route }) => {
  // for user details
  const [username, setUsername] = useState(route.params.user.username);
  const [email, setEmail] = useState(route.params.user.email);
  const [password, setPassword] = useState(route.params.user.password);

  return (
    <View>
      <Text>Welcome! </Text>
      <Text>Email: {email}</Text>
      <Text>Username: {username}</Text>
      <Text>Password: {password}</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});

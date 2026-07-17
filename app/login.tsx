import { router } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

export default function LoginScreen() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {

    try {

      const response = await fetch(
        "http://192.168.31.186:8080/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      console.log("Status:", response.status);

      const text = await response.text();
      console.log("Response:", text);

      if (!response.ok) {
        Alert.alert("Server Error", text);
        return;
      }

      const data = JSON.parse(text);

      if (data && data.id) {

        Alert.alert("Success", "Login Successful");

        router.replace({
          pathname: "/(tabs)",
          params: {
            userId: data.id.toString(),
          },
        });

        console.log("Logged In User:", data);
        Alert.alert("Success", "Login Successful\nUser ID: " + data.id);

      } else {

        Alert.alert("Error", "Invalid Credentials");

      }

    } catch (e: any) {
      console.log(e);
      Alert.alert("Error", JSON.stringify(e));
    }

  };

  return (

    <View style={styles.container}>

      <Text style={styles.heading}>
        KONVO LOGIN
      </Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={login}
      >

        <Text style={styles.buttonText}>
          Login
        </Text>

      </TouchableOpacity>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },

  heading: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
    color: "#2563eb",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 10,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },

});
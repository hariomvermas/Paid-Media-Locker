import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {

    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    try {

      const response = await fetch(
        "http://192.168.31.186:8080/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type":"application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const result = await response.text();

      Alert.alert("Konvo", result);

      router.replace("/login");

    } catch {

      Alert.alert("Error","Unable to connect to server.");

    }

  };

  return (

    <View style={styles.container}>

      <Text style={styles.heading}>Create Account</Text>

      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
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
        onPress={register}
      >
        <Text style={styles.buttonText}>
          Register
        </Text>
      </TouchableOpacity>

    </View>

  );

}

const styles = StyleSheet.create({

  container:{
    flex:1,
    justifyContent:"center",
    padding:20,
    backgroundColor:"#fff",
  },

  heading:{
    fontSize:30,
    fontWeight:"bold",
    textAlign:"center",
    marginBottom:30,
    color:"#2563eb",
  },

  input:{
    borderWidth:1,
    borderColor:"#ccc",
    borderRadius:8,
    padding:12,
    marginBottom:15,
  },

  button:{
    backgroundColor:"#2563eb",
    padding:14,
    borderRadius:8,
  },

  buttonText:{
    color:"#fff",
    textAlign:"center",
    fontWeight:"bold",
    fontSize:18,
  },

});
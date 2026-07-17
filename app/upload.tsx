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

import * as ImagePicker from "expo-image-picker";

export default function UploadScreen() {

  const [image, setImage] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const pickImage = async () => {

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }

  };

  const uploadImage = async () => {

    if (!image) {
      Alert.alert("Please select an image");
      return;
    }

    const formData = new FormData();

    formData.append("file", {
      uri: image.uri,
      name: "image.jpg",
      type: "image/jpeg",
    } as any);

    formData.append("title", title);
    formData.append("price", price);
    formData.append("ownerId", "2"); // Replace later with logged-in user ID

    try {

      const response = await fetch(
        "http://192.168.31.186:8080/api/media/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      Alert.alert("Success", "Image Uploaded Successfully!");

      router.replace("/(tabs)");
    } catch (e) {

      Alert.alert("Error", "Upload Failed");

      console.log(e);

    }

  };

  return (

    <View style={styles.container}>

      <Text style={styles.heading}>
        Upload Media
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={pickImage}
      >
        <Text style={styles.buttonText}>
          Select Image
        </Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Unlock Price"
        keyboardType="numeric"
        style={styles.input}
        value={price}
        onChangeText={setPrice}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={uploadImage}
      >
        <Text style={styles.buttonText}>
          Upload
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
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
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
    marginBottom: 15,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },

});
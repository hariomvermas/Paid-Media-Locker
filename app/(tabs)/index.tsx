import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const { userId } = useLocalSearchParams();

  const currentUserId = userId ? Number(userId) : 0;

  const [media, setMedia] = useState<any[]>([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [unlockStatus, setUnlockStatus] = useState<{ [key: number]: boolean }>(
    {}
  );

  const loadMedia = () => {
    fetch("http://192.168.31.186:8080/api/media")
      .then((response) => response.json())
      .then((data) => {
        setMedia(data);

        if (currentUserId === 0) return;

        data.forEach((item: any) => {
          fetch(
            `http://192.168.31.186:8080/api/media/status?userId=${currentUserId}&mediaId=${item.id}`
          )
            .then((response) => response.json())
            .then((status) => {
              setUnlockStatus((prev) => ({
                ...prev,
                [item.id]: status,
              }));
            })
            .catch((error) => console.log(error));
        });
      })
      .catch((error) => console.log(error));
  };

  const loadWallet = () => {
    if (currentUserId === 0) {
      setWalletBalance(0);
      return;
    }

    fetch(`http://192.168.31.186:8080/api/wallet/${currentUserId}`)
      .then((response) => response.json())
      .then((balance) => setWalletBalance(balance))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadMedia();
    loadWallet();
  }, [currentUserId]);

  const unlockMedia = async (mediaId: number) => {
    if (currentUserId === 0) {
      Alert.alert("Login Required", "Please login first.");
      return;
    }

    try {
      const response = await fetch(
        "http://192.168.31.186:8080/api/media/unlock",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: currentUserId,
            mediaId: mediaId,
          }),
        }
      );

      const result = await response.text();

      Alert.alert("Konvo", result);

      loadWallet();
      loadMedia();
    } catch (error) {
      Alert.alert("Error", "Unable to connect to server.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>KONVO</Text>

      <Text style={styles.wallet}>
        Wallet Balance : {walletBalance} Coins
      </Text>

      {currentUserId > 0 && (
        <>
          <Link href="/upload" asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Upload New Media</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/login" asChild>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#dc2626" }]}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </Link>
        </>
      )}

      {currentUserId === 0 && (
        <>
          <Link href="/login" asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/register" asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </Link>
        </>
      )}

      <FlatList
        data={media}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const imageUrl =
            "http://192.168.31.186:8080/uploads/" +
            encodeURIComponent(item.imagePath);

          return (
            <View style={styles.card}>
              <Image
                source={{ uri: imageUrl }}
                style={styles.image}
                resizeMode="cover"
              />

              <Text style={styles.title}>{item.title}</Text>

              <Text style={styles.price}>
                Price : {item.unlockPrice} Coins
              </Text>

              {currentUserId > 0 && (
                <Text
                  style={{
                    color: unlockStatus[item.id] ? "green" : "red",
                    fontWeight: "bold",
                    fontSize: 16,
                    marginTop: 8,
                  }}
                >
                  {unlockStatus[item.id]
                    ? "🔓 Unlocked"
                    : "🔒 Locked"}
                </Text>
              )}

              <TouchableOpacity
                style={styles.button}
                onPress={() => unlockMedia(item.id)}
              >
                <Text style={styles.buttonText}>Unlock</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },

  heading: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2563eb",
    marginBottom: 15,
  },

  wallet: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },

  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },

  image: {
    width: "100%",
    height: 220,
    borderRadius: 10,
    backgroundColor: "#eee",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },

  price: {
    fontSize: 16,
    marginTop: 5,
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
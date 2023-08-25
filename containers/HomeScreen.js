import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [roomData, setRoomData] = useState([]);
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenFromStorage = await AsyncStorage.getItem("userToken");
        setUserToken(tokenFromStorage);

        if (tokenFromStorage) {
          const response = await axios.get(
            "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms",
            {
              headers: {
                Authorization: `Bearer ${tokenFromStorage}`,
              },
            }
          );
          setRoomData(response.data);
        }
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchData();
  }, []);

  const navigateToRoomDetails = (roomId) => {
    navigation.navigate("RoomDetails", { roomId });
  };

  const renderRoomItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigateToRoomDetails(item._id)}
      style={styles.roomContainer}
    >
      <Image source={{ uri: item.photos[0].url }} style={styles.roomImage} />
      <View style={styles.roomDetails}>
        <Text style={styles.roomTitle}>{item.title}</Text>
        <Text style={styles.roomPrice}>Price: ${item.price}</Text>
        <View style={styles.hostContainer}>
          <Image
            source={{ uri: item.user.account.photo.url }}
            style={styles.hostImage}
          />
          <Text style={styles.hostRating}>Rating: {item.ratingValue}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text>Welcome home!</Text>
      {userToken ? (
        <FlatList
          data={roomData}
          renderItem={renderRoomItem}
          keyExtractor={(item) => item._id}
        />
      ) : (
        <Text>Please log in to view the room list.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  roomContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  roomImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  roomDetails: {
    flex: 1,
  },
  roomTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  roomPrice: {
    marginTop: 5,
  },
  hostContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  hostImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  },
  hostRating: {
    fontSize: 12,
    color: "gray",
  },
});

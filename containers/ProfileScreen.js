import { useRoute } from "@react-navigation/core";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react"; // N'oubliez pas d'importer React, useEffect et useState

export default function ProfileScreen() {
  const { params } = useRoute();

  const [storedUserId, setStoredUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userIdFromStorage = await AsyncStorage.getItem("userId");
      setStoredUserId(userIdFromStorage);
    };

    fetchData();
  }, []);

  return (
    <View>
      <Text>user id : {storedUserId}</Text>
    </View>
  );
}

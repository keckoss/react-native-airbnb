import React, { useState } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    const apiUrl =
      "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in";

    const userData = {
      email,
      password,
    };

    try {
      const response = await axios.post(apiUrl, userData);
      const userToken = response.data.token; // Assuming the response has a "token" field
      setToken(userToken);
      const userId = response.data.id;
      const userToken2 = response.data.token;
      console.log(userId);
      console.log(userToken2);
      await AsyncStorage.setItem("userId", userId);
      await AsyncStorage.setItem("userToken", userToken2);
      Alert.alert("Succès", "Connexion réussie !");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        Alert.alert("Erreur", error.response.data.message);
      } else {
        Alert.alert(
          "Erreur",
          "Une erreur s'est produite lors de la connexion."
        );
      }
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View>
        <View>
          <Text>Email: </Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Text>Password: </Text>
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <Button title="Sign in" onPress={signIn} />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text>Create an account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

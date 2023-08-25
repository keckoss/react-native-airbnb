import React, { useState } from "react";
import { Button, Text, TextInput, View, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

export default function SignUpScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signUp = async () => {
    if (!email || !username || !description || !password || !confirmPassword) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas.");
      return;
    }

    const apiUrl =
      "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up";

    const userData = {
      email,
      username,
      description,
      password,
    };

    try {
      const response = await axios.post(apiUrl, userData);
      const userToken = response.data.token; // Assuming the response has a "token" field
      setToken(userToken);
      Alert.alert("Succès", "Inscription réussie !");
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
          "Une erreur s'est produite lors de l'inscription."
        );
      }
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View>
        <Text>Email: </Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text>Username: </Text>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <Text>Description: </Text>
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <Text>Password: </Text>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Text>Confirm Password: </Text>
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <Button title="Sign up" onPress={signUp} />
      </View>
    </KeyboardAwareScrollView>
  );
}

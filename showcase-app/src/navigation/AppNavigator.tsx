import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
/* navigator */
import { HomeStackNavigator } from "./HomeStackNavigator";
/* screens */
import { AuthScreen } from "../screens/AuthScreen";
/* contexts */
import { UserContext } from "../contexts/userContext";

export const AppNavigator = () => {
  const { user } = useContext(UserContext);

  return (
    <NavigationContainer>
      {!user ? <AuthScreen /> : <HomeStackNavigator />}
    </NavigationContainer>
  );
};

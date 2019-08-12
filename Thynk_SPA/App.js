import React from "react";
import { StyleSheet, View, SafeAreaView, FlatList } from "react-native";
import { ScreenOrientation } from "expo";
import { Button, Icon, ListItem, Text } from "react-native-elements";
import Employee from "./src/Employee";
import AddView from "./src/AddView";
import EmployeeList from "./src/EmployeeList";
import AppContainer from "./src/AppContainer";

export default function App() {
  return <AppContainer />;
}

rightPanel = (
  <View
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    <Text h2>Please Select an Employee</Text>
  </View>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

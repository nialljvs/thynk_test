import React, { Component } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity
} from "react-native";
import { ScreenOrientation } from "expo";
import { Button, ListItem, Text } from "react-native-elements";
import Employee from "./Employee";
import AddView from "./AddView";
import EmployeeList from "./EmployeeList";

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.employee = true;
  }
  doForceUpdate() {
    this.forceUpdate();
  }

  render() {
    let formData = new FormData();
    formData.append("action", "get_employees");
    fetch("http://127.0.0.1/thynk_test/API.php", {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(res => {
        this.setState({ employees: res.employees });
      })
      .done();
    return (
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: "row"
        }}
      >
        <View
          style={{
            flex: 0.55,
            backgroundColor: "lightgray",
            flexDirection: "column"
          }}
        >
          <View style={{ flex: 0.1, flexDirection: "row" }}>
            <Text h1>List of Employees</Text>
            <View
              style={{
                flex: 1,
                alignContent: "center",
                justifyContent: "center"
              }}
            >
              <Button
                type="clear"
                icon={{
                  name: "plus",
                  type: "font-awesome"
                }}
                onPress={() => {
                  rightPanel = <AddView displayAddView={true} />;
                  this.forceUpdate();
                }}
              />
            </View>
          </View>
          <View>
            <FlatList
              data={this.state.employees}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ employee: [item] });
                    rightPanel = (
                      <AddView employee={item} displayAddView={true} />
                    );
                    this.forceUpdate();
                  }}
                >
                  <ListItem
                    leftAvatar={{
                      rounded: true,
                      source: { uri: "data:image/jpg;base64," + item.avatar }
                    }}
                    title={item.name}
                    subtitle={item.role}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
        <View
          style={{
            flex: 0.45
          }}
        >
          {rightPanel}
        </View>
      </SafeAreaView>
    );
  }
}
export default AppContainer;

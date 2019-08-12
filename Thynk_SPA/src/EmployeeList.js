import React, { Component } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";

class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.employees = [{}];
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
      <FlatList
        data={this.state.employees}
        renderItem={({ item }) => (
          <TouchableOpacity>
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
    );
  }
}
export default EmployeeList;

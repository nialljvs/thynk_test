import React, { Component } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { Input, Image, Button, Icon } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
class AddView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };
  imageClickHandler = async () => {
    await this.askPermissionsAsync();
    Alert.alert(
      "Choose Method",
      "Either take a new photo, or select a saved one.",
      [
        {
          text: "Take Photo",
          onPress: () =>
            ImagePicker.launchCameraAsync({
              mediaTypes: "Images",
              allowsEditing: true
            })
        },
        {
          text: "Choose Photo",
          onPress: async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: "Images",
              allowsEditing: true,
              base64: true
            });
            this.setState({ avatar: /*this.b64toBlob*/ result.base64 });
            if (this.props.employee) {
              this.setState({ avatar_id: this.props.employee.ID });
            }
          }
        }
      ]
    );
  };
  handleInputChange(type, value) {
    this.setState({ [type]: value });
  }
  onDeletePress() {
    if (this.props.employee) {
      Alert.alert("Delete", "Are you sure you want to delete?", [
        {
          text: "Ok",
          onPress: () => {
            let formData = new FormData();
            formData.append("employee_id", this.props.employee.ID);
            formData.append("action", "delete_employee");
            fetch("http://127.0.0.1/thynk_test/API.php", {
              method: "POST",
              body: formData
            })
              .then(response => response.json())
              .then(res => {
                if (res.hasOwnProperty("result")) {
                  console.log(res.result);
                  this.forceUpdate();
                } else {
                  alert("error");
                }
              })
              .done();
          }
        },
        {
          text: "Cancel"
        }
      ]);
    } else {
    }
  }
  onSavePress() {
    console.log(this.state);
    let formData = new FormData();
    var action = "";
    if (this.props.employee) {
      action = "update_employee";
      formData.append("employee_id", this.props.employee.ID);
      formData.append(
        "name",
        this.state.name ? this.state.name : this.props.employee.name
      );
      formData.append(
        "role",
        this.state.role ? this.state.role : this.props.employee.role
      );
      formData.append(
        "hobbies",
        this.state.hobbies ? this.state.hobbies : this.props.employee.hobbies
      );
      formData.append(
        "blog",
        this.state.blog ? this.state.blog : this.props.employee.blog
      );
      formData.append(
        "hometown",
        this.state.hometown ? this.state.hometown : this.props.employee.hometown
      );
      formData.append(
        "motto",
        this.state.motto ? this.state.motto : this.props.employee.motto
      );
      formData.append(
        "avatar",
        this.state.avatar ? this.state.avatar : this.props.employee.avatar
      );
    } else {
      action = "add_employee";
      formData.append("name", this.state.name);
      formData.append("role", this.state.role);
      formData.append("hobbies", this.state.hobbies);
      formData.append("blog", this.state.blog);
      formData.append("hometown", this.state.hometown);
      formData.append("motto", this.state.motto);
      formData.append("avatar", this.state.avatar);
    }
    formData.append("action", action);
    fetch("http://127.0.0.1/thynk_test/API.php", {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(res => {
        if (res.hasOwnProperty("result")) {
          console.log(res.result);
        } else {
          alert("error");
        }
      })
      .done();
  }
  render() {
    if (this.props.displayAddView) {
      return (
        <View style={{ flex: 1, flexDirection: "column" }}>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Button
              type="clear"
              icon={{
                name: "save",
                type: "font-awesome"
              }}
              onPress={this.onSavePress.bind(this)}
            />
            <Button
              type="clear"
              icon={{
                name: "trash",
                type: "font-awesome"
              }}
              onPress={this.onDeletePress.bind(this)}
            />
          </View>
          <TouchableOpacity onPress={this.imageClickHandler}>
            <Image
              source={
                this.props.employee
                  ? this.state.avatar_id == this.props.employee.ID
                    ? { uri: "data:image/jpeg;base64," + this.state.avatar }
                    : {
                        uri:
                          "data:image/jpeg;base64," + this.props.employee.avatar
                      }
                  : this.state.avatar
                  ? { uri: "data:image/jpeg;base64," + this.state.avatar }
                  : require("../assets/pencil-icon.jpg")
              }
              style={{ width: 400, height: 400, borderRadius: 400 / 2 }}
            />
          </TouchableOpacity>
          <Input
            placeholder="Name"
            onChangeText={value => {
              this.handleInputChange("name", value);
            }}
            defaultValue={this.props.employee ? this.props.employee.name : ""}
          />
          <Input
            placeholder="Role"
            onChangeText={value => {
              this.handleInputChange("role", value);
            }}
            defaultValue={this.props.employee ? this.props.employee.role : ""}
          />
          <Input
            placeholder="Motto"
            onChangeText={value => {
              this.handleInputChange("motto", value);
            }}
            defaultValue={this.props.employee ? this.props.employee.motto : ""}
          />
          <Input
            placeholder="Hobbies"
            onChangeText={value => {
              this.handleInputChange("hobbies", value);
            }}
            defaultValue={
              this.props.employee ? this.props.employee.hobbies : ""
            }
          />
          <Input
            placeholder="Hometown"
            onChangeText={value => {
              this.handleInputChange("hometown", value);
            }}
            defaultValue={
              this.props.employee ? this.props.employee.hometown : ""
            }
          />
          <Input
            placeholder="Personal Blog"
            onChangeText={value => {
              this.handleInputChange("blog", value);
            }}
            defaultValue={this.props.employee ? this.props.employee.blog : ""}
          />
        </View>
      );
    }
  }
}
export default AddView;

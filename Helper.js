import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export async function Storetask(task) {
  let arr = [];
  await AsyncStorage.getItem("TaskArray")
    .then(async (res) => {
      arr = JSON.parse(res);
      arr.push(task);
      await AsyncStorage.setItem("TaskArray", JSON.stringify(arr)).then(async() => {
        Alert.alert("Task Added!", "", [
        {
          text: "Ok",
          onPress: null,
        },
      ]);
      }).catch(e => console.log(e));
    })
    .catch((e) => {
      Alert.alert("Error!", "", [
        {
          text: "Retry",
          onPress: null,
        },
      ]);
      console.log(e);
    });
}
export async function getTask() {
  await AsyncStorage.getAllKeys()
    .then(async (res) => {
      if (res.length == 0) {
        console.log("SettingDefaultValue");
        await AsyncStorage.setItem("TaskArray", JSON.stringify([]));
      } else {
        await AsyncStorage.getItem("TaskArray")
          .then((res) => {
            // console.log(res)
            let x = JSON.parse(res);
            console.log(res);
            console.log(x);
            return x;
            // value previously stored
          })
          .catch((e) => console.log(e));
      }
    })
    .catch((e) => console.log(e));
}

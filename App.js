import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Keyboard,
  ScrollView,
} from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import Task from "./components/task";
import { Storetask } from "./Helper";

export default function App() {
  const [task, setTask] = useState("");
  const [taskAdd, setTaskAdd] = useState(false);
  const [taskItems, setTaskItems] = useState([]);

  const handleAddtask = () => {
    Keyboard.dismiss();
    setTaskAdd(true);
    Storetask(task);
    setTask(null);
  };

  useEffect(() => {
    async function Test() {
      await AsyncStorage.getItem("TaskArray").then((res) => {
        setTaskItems(JSON.parse(res));
      });
    }
    Test();
  }, []);

  const completeTask = async (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskAdd(true);
    await AsyncStorage.setItem("TaskArray", JSON.stringify(itemsCopy)).then(
      () => setTaskAdd(false)
    );
    // setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TODO</Text>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.tasksWrapper}>
          <View style={styles.taskview}>
            {taskItems === null || taskItems.length === 0 ? (
              <Text>Nothing here! Add some task from below</Text>
            ) : (
              taskItems.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => completeTask(index)}
                  >
                    <Task text={item} />
                  </TouchableOpacity>
                );
              })
            )}
          </View>
        </View>
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrap}
      >
        <TextInput
          style={styles.input}
          placeholder={"Enter a Task"}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={() => handleAddtask()}>
          <View style={styles.addWrap}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
// Styling -
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: heightPercentageToDP("10%"),
    paddingHorizontal: "6%",
    backgroundColor: "#E8EAED",
  },

  taskswrapper: {
    marginTop: heightPercentageToDP("5%"),
    marginHorizontal: heightPercentageToDP("5%"),
  },

  header: {
    fontSize: 40,
    fontWeight: "bold",
  },

  taskview: {
    marginTop: heightPercentageToDP("5%"),
  },

  writeTaskWrap: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    marginHorizontal: '10%'
  },

  input: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '75%',
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },

  addWrap: {
    width: 55,
    height: 55,
    backgroundColor: "white",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {
    fontSize: 25,
    color: "#55BCF6",
  },
});

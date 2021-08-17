import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Platform, TextInput, Keyboard, ScrollView } from "react-native";
import {heightPercentageToDP, widthPercentageToDP,} from "react-native-responsive-screen";
import Task from "./components/Task";
import { Storetask,getTask } from "./Helper";

export default function App() {
  const [task, setTask] = useState("");
  const [TaskAdd, setTaskAdd] = useState(false);
  const [taskItems, setTaskItems] = useState([]);

  const handleAddtask = () => {
    
    Keyboard.dismiss();
    setTaskAdd(true)
    Storetask(task)
    setTask(null);
  }
React.useEffect(()=>{

  async function Test(){
    await AsyncStorage.getItem('TaskArray')
    .then(res=>{
      console.log("inside Use effect")
      console.log(res)
      setTaskItems(JSON.parse(res))
    })
  }
  Test()
 
},[])

React.useEffect(()=>{

  async function Test(){
    await AsyncStorage.getItem('TaskArray')
    .then(res=>{
      console.log("inside Use effect")
      console.log(res)
      setTaskItems(JSON.parse(res))
      setTaskAdd(false)
    })
  }
  if(TaskAdd){
    console.log("re render")
    
  }Test()
  
 
},[TaskAdd])

  const completeTask = async (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskAdd(true)
    await AsyncStorage.setItem('TaskArray', JSON.stringify(itemsCopy))
    .then(()=>setTaskAdd(false))
    // setTaskItems(itemsCopy);
  }
  
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >
      <Text style={styles.header}>ToDo</Text>
      <View style={styles.tasksWrapper}>
        <View style={styles.taskview}>
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task text={item} />
                </TouchableOpacity>
            ) 
              
            })
          }
          {/* <Task text='Task 1' />
          <Task text="Task 2" /> */}
        </View>
      </View>

      </ScrollView>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrap}>
          <TextInput style={styles.input} placeholder={"Enter a Task"} value={task} onChangeText={text => setTask(text)}></TextInput>
          <TouchableOpacity onPress={() => handleAddtask()} >
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
    paddingTop:heightPercentageToDP('10%'),
    paddingHorizontal: 20,
    backgroundColor: "#E8EAED",
  },

  taskswrapper: {
    marginTop: heightPercentageToDP('5%'),
    marginHorizontal: heightPercentageToDP('5%'),

  },

  header: {
    fontSize: 40,
    fontWeight: "bold",
  },

  taskview: {
    marginTop: heightPercentageToDP('5%'),
  },

  writeTaskWrap: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingLeft: 20,
  },

  input: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: 250,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#C0C0C0',
    borderWidth: 1,

  },

  addWrap: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 50,
    justifyContent:"center",
    alignItems: "center",
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    fontSize: 25,
    color: '#55BCF6'
  },
});

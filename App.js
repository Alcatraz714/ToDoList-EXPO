import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Task from './components/task';
export default function App() {
  return (
    <View style={styles.container}>
      {/* Heading */}
      <View style={styles.taskswrapper}>
        <Text sytle={styles.title}>Today's Task !?</Text>
        <View style={styles.taskview}>
          {/* App View tasks */}
          <Task text='Task 1' />
          <Task text='Task 2' />

        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },

  taskswrapper: {
    // paddingTop: 60,
    // paddingHorizontal: 20,
    
  }, 

  title: {
    fontSize: 24,
    fontWeight: "bold",

  },

  taskview:{}
});

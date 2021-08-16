import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Task = (props) =>{
    return (
        <View style={styles.item1}>
            <View style={styles.item2}>
            <TouchableOpacity style={styles.square}></TouchableOpacity>
            <Text style={styles.text}>{props.text}</Text>
            </View>
            <View style={styles.circle}>

            </View>
            

        </View>
    )

}

const styles = StyleSheet.create({
    itme1:{
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,

    },
    item2:{},
    square:{},
    text:{},
    cirlce:{},

});

export default Task;
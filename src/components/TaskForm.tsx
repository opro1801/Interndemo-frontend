import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as TaskRequest from '../requests/TaskRequest';

export interface Task {
    id: string;
    taskName: string;
    sequenceNumber: string;
    status: TaskStatus;
}

export enum TaskStatus {
    IN_PROGRESSS = 'IN_PROGRESS',
    COMPLETE = 'COMPLETE',
}

interface Props {
    taskName: string;
    sequenceNumber: string;
    setTaskName: React.Dispatch<React.SetStateAction<string>>;
    setSequenceNumber: React.Dispatch<React.SetStateAction<string>>;
    createTask: Function;
}

const TaskForm: React.FC<Props> = ({taskName, setTaskName, sequenceNumber, setSequenceNumber, createTask}) => {

    return (
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Task Name"
                    value={taskName}
                    onChangeText={text => setTaskName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Sequence Number"
                    keyboardType="numeric"
                    returnKeyType="done"
                    value={String(sequenceNumber)}
                    onChangeText={text => setSequenceNumber(text)}
                />
                <TouchableOpacity style={styles.addTaskButton} onPress={() => createTask}>
                    <Text style={styles.buttonText}>Create Task</Text>
                </TouchableOpacity>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    heading: {
      fontSize: 20,
      fontWeight: '700',
    },
    form: {
      marginTop: 30,
    },
    input: {
      padding: 15,
      borderColor: 'rgba(0, 0, 0, 0.2)',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 20,
    },
    addTaskButton: {
      backgroundColor: '#eb8634',
      paddingVertical: 20,
      borderRadius: 5,
      alignItems: 'center',
    },
    buttonText: {color: '#fff', fontWeight: '500'},
  });

  export default TaskForm;
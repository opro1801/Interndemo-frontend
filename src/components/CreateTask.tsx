import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Keyboard } from 'react-native';
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
    setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
    taskList: Task[];
    isCreateTask: boolean;
    setIsCreateTask: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTask: React.FC<Props> = ({taskList, setTaskList, isCreateTask, setIsCreateTask }) => {
    // const [isCreateTask, setIsCreateTask] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [sequenceNumber, setSequenceNumber] = useState('');
    const createTask = async () => {
        if(!taskName) {
            Alert.alert('No Task!', 'You need to enter a task name');
        } else if(!sequenceNumber || isNaN(parseInt(sequenceNumber))){
            Alert.alert('Sequence Number invalid');
        } else {
            setTaskName('');
            setSequenceNumber('');
            const data = await TaskRequest.CreateTaskRequest(taskName, parseInt(sequenceNumber).toString());
            // setListUpdate(!listUpdate);
            setTaskList([
                ...taskList,
                {
                    id: data.id,
                    taskName: data.taskName,
                    sequenceNumber: data.sequenceNumber,
                    status: data.status,
                }
            ]);
            // console.log(data);
            // console.log("hello");
            console.log(taskList);
            Keyboard.dismiss;
            setIsCreateTask(false);
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.createTaskButton} onPress={() => setIsCreateTask(!isCreateTask)}>
                <Text style={styles.heading}>Create Task</Text>
            </TouchableOpacity>
            { isCreateTask &&
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Task Name"
                    value={taskName}
                    onChangeText={text => setTaskName(text)}
                    // onEndEditing={Keyboard.dismiss}
                    onSubmitEditing={Keyboard.dismiss}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Sequence Number"
                    keyboardType="numeric"
                    value={String(sequenceNumber)}
                    onChangeText={text => setSequenceNumber(text)}
                    // onEndEditing={Keyboard.dismiss}
                />
                <TouchableOpacity style={styles.addTaskButton} onPress={createTask}>
                    <Text style={styles.buttonText}>Create Task</Text>
                </TouchableOpacity>
            </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    createTaskButton: {
        borderRadius: 10,
        padding: 5,
        width: 150,
        alignItems: 'center',
        backgroundColor: 'rgba(100, 150, 150, 0.5)'  
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

  export default AddTask;
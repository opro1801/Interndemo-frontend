import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert, TextInput} from 'react-native';
import { Task, TaskStatus } from './CreateTask';
import * as TaskRequest from '../requests/TaskRequest';

interface Props {
  taskName: string;
  sequenceNumber: string;
  id: string;
  taskList: Task[];
  status: TaskStatus;
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
  completedTaskList: Task[];
  setCompletedTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskComp: React.FC<Props> = ({taskName, sequenceNumber, id, status, taskList, setTaskList, setReload, reload}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [newTaskName, setNewTaskName] = useState(taskName);
  const [newSequenceNumber, setNewSequenceNumber] = useState(sequenceNumber);
  const [isEditing, setIsEditing] = useState(false);

  const editTask = async (newTaskName: string, newSequenceNumber: string) => {
    const data = await TaskRequest.EditTaskRequest(id, newTaskName, newSequenceNumber);
      // setTaskList(taskList.filter(task => {
      //   if(id === task.id) return task;
      //   return {
      //     taskName: newTaskName,
      //     id: task.id,
      //     sequenceNumber: newSequenceNumber,
      //     status: task.status,
      //   }
      // }))
      setReload(!reload);
  };

  const deleteTask = async () => {
    Alert.alert(
      "Delete Task",
      "Confirm delete task",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        { text: "OK", onPress: async () => {      
            const data = await TaskRequest.DeleteTaskRequest(id);
            if(data.result) {
              setTaskList(taskList.filter(task => task.id !== id));
            };
          } 
        }
      ]
    )

  };

  const completeTask = async () => {
    const data = await TaskRequest.UpdateTaskRequest(id);
    if(data.status === TaskStatus.COMPLETE) {
      // setTaskList(taskList.filter(task => {
      //   return id !== task.id;
      // }))
      // setCompletedTaskList([
      //   ...completedTaskList,
      //   {
      //     taskName: data.taskName,
      //     id: data.id,
      //     sequenceNumber: data.sequenceNumber,
      //     status: TaskStatus.COMPLETE
      //   }
      // ])
      setReload(!reload);
    }
  }

  return (
    <View style={styles.item}>
      <TouchableOpacity style={styles.taskButton} onPress={() => {
        setIsSelected(!isSelected);
        setIsEditing(false);
        }}>
        <Text style={styles.taskName}>{taskName}</Text>
        <Text style={styles.sequenceNumber}>{sequenceNumber}</Text>
      </TouchableOpacity>

      {isSelected &&
        <View style={styles.functionalButton}>
          <TouchableOpacity style={styles.subButton} onPress={() => {setIsEditing(!isEditing)}}>
            <Text>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.subButton} onPress={() => deleteTask()}>
            <Text>Delete</Text>
          </TouchableOpacity>
          { status === TaskStatus.IN_PROGRESSS &&
          <TouchableOpacity style={styles.subButton} onPress={() => completeTask()}>
            <Text>Complete</Text>
          </TouchableOpacity>
          }
        </View>
      }
      { isEditing &&       
        <View style={styles.form}>
            <TextInput
                style={styles.input}
                placeholder="Enter Task Name"
                value={newTaskName}
                onChangeText={text => setNewTaskName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter Sequence Number"
                keyboardType="numeric"
                returnKeyType="done"
                value={newSequenceNumber}
                onChangeText={text => setNewSequenceNumber(text)}
            />
            <TouchableOpacity style={styles.editTaskButton} onPress={() => {
                if(!newTaskName) {
                  Alert.alert('No Task!', 'You need to enter a task name');
                } else if(!newSequenceNumber || isNaN(parseInt(newSequenceNumber))){
                  Alert.alert('Sequence Number invalid');
                } else{
                  editTask(newTaskName, parseInt(newSequenceNumber).toString())}
                }
              }>
                <Text style={styles.buttonText}>Edit Task</Text>
            </TouchableOpacity>
        </View>
      }
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    paddingVertical: 10,
    backgroundColor: 'rgba(0,100,150,0.5)',
    marginVertical: 5,
    borderRadius: 10,
    padding: 5,
  },
  taskButton: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  taskName: {
    fontWeight: '500',
  },
  sequenceNumber: {
    padding: 6,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  functionalButton: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  subButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderWidth: 1,
    marginTop: 10,
    width: '30%',
    borderRadius: 10,
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
  editTaskButton: {
    backgroundColor: '#eb8634',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {color: '#fff', fontWeight: '500'},

});
export default TaskComp;
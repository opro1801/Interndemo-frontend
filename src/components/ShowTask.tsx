import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Alert} from 'react-native';
import { Task } from './CreateTask';
import TaskComp from './TaskComp';
import * as TaskRequest from '../requests/TaskRequest';

interface Props {
    setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
    taskList: Task[];
    completedTaskList: Task[];
    setCompletedTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
}


export enum TaskStatus {
    IN_PROGRESSS = 'IN_PROGRESS',
    COMPLETE = 'COMPLETE',
}


const ShowTask: React.FC<Props> = ({setTaskList, taskList, completedTaskList, setCompletedTaskList}) => {
    const [isShowTask, setIsShowTask] = useState(false);
    const [reload, setReload] = useState(false);

    const resetTask = async () => {
        Alert.alert(
            "Reset Task",
            "Confirm rest all the tasks",
            [
                {
                    text: "Cancel",
                    onPress: () => {},
                    style: "cancel"
                },
                { 
                    text: "OK", onPress: async () => {      
                    const data = await TaskRequest.ResetTaskRequest();
                    setTaskList([]);
                    setCompletedTaskList([]);
                } 
              }
            ]
          )
    }

    const getTasks = async () => {
        const data = await TaskRequest.GetTaskRequest();
        setTaskList(data.filter((task: Task) => task.status === TaskStatus.IN_PROGRESSS));
        setCompletedTaskList(data.filter((task: Task) => task.status === TaskStatus.COMPLETE));
    }

    useEffect(() => {
        getTasks();
    }, [reload]);

    return (
        <View style={styles.container}>
            <View style={styles.taskManipulation}>
                <TouchableOpacity style={styles.headButton} onPress={() => setIsShowTask(!isShowTask)}>
                    <Text style={styles.heading}>Show Task</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.headButton} onPress={() => resetTask()}>
                    <Text style={styles.heading}>Reset</Text>
                </TouchableOpacity>
            </View>
            

            {isShowTask &&
            <View>
                <View>
                    <Text>Uncompleted Tasks</Text>
                </View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{maxHeight: '40%'}}
                    data={taskList}
                    keyExtractor={(item) => `${item.id}-${item.taskName}-${item.sequenceNumber}`}
                    renderItem={({ item }) => (
                        <TaskComp taskName={item.taskName} 
                                    sequenceNumber={item.sequenceNumber} 
                                    status={item.status}
                                    id={item.id} 
                                    taskList={taskList} 
                                    setTaskList={setTaskList}
                                    setCompletedTaskList={setCompletedTaskList}
                                    completedTaskList={completedTaskList}     
                                    reload={reload}    
                                    setReload={setReload}    
                        />
                        )}
                />
                <View>
                    <Text>Completed Tasks</Text>
                </View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={completedTaskList}
                    style={{height: '40%'}}
                    keyExtractor={(item) => `${item.id}-${item.taskName}-${item.sequenceNumber}`}
                    renderItem={({ item }) => (
                        <TaskComp   taskName={item.taskName} 
                                    sequenceNumber={item.sequenceNumber} 
                                    id={item.id} 
                                    status={item.status}
                                    taskList={taskList}
                                    setTaskList={setTaskList} 
                                    setCompletedTaskList={setCompletedTaskList}
                                    completedTaskList={completedTaskList}
                                    reload={reload}
                                    setReload={setReload}
                                    />
                        )}
                />                
            </View>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    headButton: {
        borderRadius: 10,
        padding: 5,
        width: 150,
        alignItems: 'center',
        backgroundColor: 'rgba(100, 150, 150, 0.5)',
        marginBottom: 20, 
    },
    heading: {
        fontSize: 20,
        fontWeight: '700',
    },
    taskManipulation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

export default ShowTask;
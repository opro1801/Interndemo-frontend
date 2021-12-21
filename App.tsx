import React, { useEffect, useState } from 'react';
import {FlatList, Keyboard, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import AddTask, { Task } from './src/components/CreateTask';
import Header from './src/components/Header';
import ShowTask from './src/components/ShowTask';
import TaskComp from './src/components/TaskComp';

const App = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [isCreateTask, setIsCreateTask] = useState(false);
  const [completedTaskList, setCompletedTaskList] = useState<Task[]>([]);


  useEffect(() => {
    setTaskList(taskList.sort((firstTask : Task, secondTask: Task) => 
      parseInt(firstTask.sequenceNumber) - parseInt(secondTask.sequenceNumber)
    ))
  }, [taskList])

  return (
    <TouchableWithoutFeedback style={{flex: 1}} 
      onPress={() => {
        Keyboard.dismiss;
        setIsCreateTask(false);
      }} accessible={false}>
      <SafeAreaView style={styles.container}>
        <Header title="Task Management" />
        <View style={styles.contentWrapper}>
          <AddTask
            setTaskList={setTaskList}
            taskList={taskList}
            isCreateTask={isCreateTask}
            setIsCreateTask={setIsCreateTask}
          />
          <ShowTask
            taskList={taskList}
            setTaskList={setTaskList}
            completedTaskList={completedTaskList}
            setCompletedTaskList={setCompletedTaskList}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e7e3',
  },
  contentWrapper: {
    padding: 20,
  }
});
export default App;
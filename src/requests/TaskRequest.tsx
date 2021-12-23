
import axios from "axios";

const baseUrl: string = 'http://18.166.226.73/tasks/';
// const baseUrl: string = 'http://192.168.137.209:3000/tasks/';
// const baseUrl: string = 'http://192.168.137.1:3000/tasks/';
// const baseUrl: string = 'http://10.89.250.137:3000/tasks/';

export const CreateTaskRequest = async (taskName: string, sequenceNumber: string) => {

    var qs = require('qs');
    var data = qs.stringify({
      'taskName': taskName,
      'sequenceNumber': sequenceNumber, 
    });
    
    return axios({
        method: 'post',
        url: baseUrl,
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
      })
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      throw error;
    });

}

export const GetTaskRequest = async () => {

    return axios({
        method: 'get',
        url: baseUrl,
        headers: { },
      })
    .then(response => {
    //   console.log(response.data);
      return response.data;
      
    })
    .catch( error =>  {
      console.log(error);
      throw error;
    });

}

export const DeleteTaskRequest = async (id: string) => {
    return axios({
        method: 'delete',
        url: baseUrl + id,
        headers: { },
      })
    .then(response => {
    //   console.log(response.data);
      return response.data;
      
    })
    .catch( error =>  {
      console.log(error);
      throw error;
    });

}

export const ResetTaskRequest = async () => {
    return axios({
        method: 'delete',
        url: baseUrl,
        headers: { },
      })
    .then(response => {
    //   console.log(response.data);
      return response.data;
      
    })
    .catch( error =>  {
      console.log(error);
      throw error;
    });

}

export const UpdateTaskRequest = async (id: string) => {
    var qs = require('qs');
    var data = qs.stringify({
      'status': 'COMPLETE'
    });
    return axios({
        method: 'patch',
        url: baseUrl + id + '/status',
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
      })
    .then(response => {
    //   console.log(response.data);
      return response.data;
      
    })
    .catch( error =>  {
      console.log(error);
      throw error;
    });
}

export const EditTaskRequest = async (id: string, taskName: string, sequenceNumber: string) => {
    var qs = require('qs');
    var data = qs.stringify({
      'taskName': taskName,
      'sequenceNumber': sequenceNumber,
    });
    return axios({
        method: 'patch',
        url: baseUrl + id + '/edit',
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
      })
    .then(response => {
    //   console.log(response.data);
      return response.data;
      
    })
    .catch( error =>  {
      console.log(error);
      throw error;
    });
}




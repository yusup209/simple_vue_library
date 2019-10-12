// import axios from "axios"
import axios from 'axios'

const URL = "http://localhost:8000/"

export default class APIService{
    getData(tbl_name){
        return axios.get(URL + "api/"+tbl_name).then(response => response.data)
    }
    getDataById(tbl_name, id){
        return axios.get(URL + "api/"+tbl_name+"/"+id).then(response => response.data)
    }
    postData(tbl_name, data){
        return axios.post(URL + "api/"+tbl_name+"/create", data).then(response => response.data)
    }
    putData(tbl_name, data){
        return axios.put(URL + "api/"+tbl_name+"/update", data).then(response => response.data)
    }
    deleteData(tbl_name, id){
        return axios.delete(URL + "api/"+tbl_name+"/delete/"+id).then(response => response.data)
    }
    returnBook(tbl_name, id){
        return axios.put(URL + "api/"+tbl_name+"/return/"+id).then(response => response.data)
    }
    // getCourses(){
    //     return axios.get(URL + "api/course").then(response => response.data)
    // }
}
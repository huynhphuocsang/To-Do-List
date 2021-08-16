const  endpoint = "http://localhost:8080/"
const headerForAddEdit = {
    "x-rapidapi-host": "fairestdb.p.rapidapi.com",
    "x-rapidapi-key": "apikey",
    "content-type": "application/json",
    "accept": "application/json"
  }
const headerForDelete = {
    "x-rapidapi-host": "fairestdb.p.rapidapi.com",
      "x-rapidapi-key": "apikey"
    }
 export function getAllTasks(url){
    return fetch (endpoint+url); 
    }
export function addNewTask(url, body){
    
        return fetch (endpoint+url, {method: "POST",headers: headerForAddEdit,body: body}); 
    }
export function editTask(url, body){
    
        return fetch (endpoint+url, {method: "PUT",headers: headerForAddEdit,body: body}); 
    }
export function deleteTask(url){
        return fetch (endpoint+url, {method: "DELETE",headers: headerForDelete}); 
    }
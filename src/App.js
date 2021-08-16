import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Title from './components/Title';
import Control from './components/Control';
import TableList from './components/TableList';
import { Component } from 'react';
import misson from './data/Task';
import {filter, includes, orderBy, remove } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import Form from './components/Form';
import {getAllTasks,addNewTask,editTask, deleteTask} from "./Helper"; 
class App extends Component {
  
  constructor(props){
    super(props);
    this.state={
      items: misson, 
      searchValue: '',
      orderName: 'Name',
      orderDir: 'ASC',
      idDelete: '',
      itemEdit: '',
      isShowForm: false
  }
  this.handleSearch = this.handleSearch.bind(this)
  this.changeOrderType = this.changeOrderType.bind(this)
  this.addNewTask = this.addNewTask.bind(this)
  this.deleteItem = this.deleteItem.bind(this)
  this.getItemEdit = this.getItemEdit.bind(this)
  this.handleForm = this.handleForm.bind(this)
  this.getAllTasks = this.getAllTasks.bind(this)
}

  componentWillMount(){
    this.getAllTasks(); 
  }
 componentDidMount(){
    this.getAllTasks(); 
  }

   getAllTasks(){
   
    getAllTasks("home").then((response)=>{
      if(response.status===200){
        return response.json();  
      }else{
        throw new Error("kkhong the doc api");
      }
    })
    .then((response)=> {
      let temp = response.data
      this.setState({
        items: temp
      })
      // temp = response.data; 
    })
    .catch((error)=> console.log(error))
  }
  handleSearch(value){
    this.setState({
      searchValue: value
    });
   
  }
  changeOrderType(orderName,orderDir){
    this.setState({
      orderName : orderName,
      orderDir: orderDir
    })
  }
  async deleteItem(id){
    // let temp =remove(this.state.items,function(item){
    //     if(item.id==id){
    //       return true
    //     } 
    // })
    
   
    await deleteTask("home/deleteTarget/"+id)
    .then(response => response.json())
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    });
    // localStorage.setItem('tasks',JSON.stringify(this.state.items))
    this.getAllTasks()
    this.setState({
      idDelete: id
    })
  }
  async addNewTask(taskId,taskName,level){
    if(taskId==''){
      let value = JSON.stringify({          
        id: 100,
        taskName: taskName,
        level: level,
        state: false
    })

      await addNewTask("home/addNew",  value)
      .then(response => response.json())
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err);
      });

    }else{
      
      // this.setState({
      //   itemEdit: ''
      // })
      let value = JSON.stringify({          
        id: taskId,
        taskName: taskName,
        level: level,
        state: true
    })
      await editTask("home/update", value)
      .then(response => response.json())
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err);
      });
    }
    //localStorage.setItem('tasks',JSON.stringify(this.state.items))
       this.getAllTasks()
  }
  getItemEdit(item){
    this.setState({
      isShowForm:true,
      itemEdit: item
      
    })
  }
  handleForm(){
    this.setState({
      isShowForm: !this.state.isShowForm
    })
  }
  render(){
    let form = null
    if(this.state.isShowForm){
       form = <Form closeForm={this.handleForm} addNewTask={this.addNewTask} itemEdit={this.state.itemEdit}/>
    }
   
    const itemsFirst = this.state.items

    let filterItems = []; 
    
    if(this.state.searchValue.length>=1){

      //cach 1: dung lodash: 

      // filterItems =  filter(itemsFirst, (item)=> {
      //     if(item.name.toLowerCase().includes(this.state.searchValue.toLowerCase())){
      //       return item; 
      //     }
      // })
     
      //cach 2: dung js thuan 
      itemsFirst.map((item,index)=>{
        if(item.taskName.toLowerCase().includes(this.state.searchValue.toLowerCase())){
          filterItems.push(item); 
        }
      });
    }else{
        filterItems = itemsFirst; 
    }

     let finalItems = orderBy(filterItems,[this.state.orderName],[this.state.orderDir.toLowerCase()])
      
        return (
          <div className="container-fluid ">
              <div className="row">
                <div className="col-md-6 col-sm-12 main-content">
                      <Title/>
      
      
                      <Control getSearchValue = {this.handleSearch} changeOrderType = {this.changeOrderType} handleForm={this.handleForm}  isShowForm = {this.state.isShowForm}/>
                      {form}
                    <TableList task = {finalItems} getId={this.deleteItem} getItemEdit={this.getItemEdit} isShowForm={this.state.isShowForm}/>
              
            
                  </div>
              </div>
            
          </div>
        );
      }
}

  

export default App;

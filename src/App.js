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
}

  componentWillMount(){
    if(localStorage.getItem('tasks')!=null){
      let items = JSON.parse(localStorage.getItem('tasks'))
        this.setState({
          items: items
        })
    }
    
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
  deleteItem(id){
    let temp =remove(this.state.items,function(item){
        if(item.id==id){
          return true
        } 
    })
    this.setState({
      idDelete: id
    })
    localStorage.setItem('tasks',JSON.stringify(this.state.items))
  }
  addNewTask(taskId,taskName,level){
    if(taskId==''){
      let item = {
        id: uuidv4(),
        name: taskName,
        level: level
      }
  
      let temp = this.state.items; 
      temp.push(item)
      this.setState({
        items: temp
      })
    }else{
      this.state.items.map((item,key)=>{
        if(item.id == taskId){
          item.name = taskName
          item.level = level
          return
        }
        this.setState({
          itemEdit: ''
        })
      })
    }
    localStorage.setItem('tasks',JSON.stringify(this.state.items))
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
        if(item.name.toLowerCase().includes(this.state.searchValue.toLowerCase())){
          filterItems.push(item); 
        }
      });
    }else{
        filterItems = itemsFirst; 
    }

     let finalItems = orderBy(filterItems,[this.state.orderName.toLowerCase()],[this.state.orderDir.toLowerCase()])
      
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

import { render } from '@testing-library/react';
import React,{Component} from 'react';
import Search from './Search';
import Sort from './Sort';
import Form from './Form';
import './style.css';
class  Control extends Component {

    constructor(props){
      super(props); 
     
      this.manageTaskForm = this.manageTaskForm.bind(this)
    }

    manageTaskForm(){
        this.props.handleForm(); 
       
    }
    
       
      

  render() {
      let openAndClose =  <button type="button" class="btn btn-primary" onClick={this.manageTaskForm}>Add new task</button>
      if(this.props.isShowForm){
        openAndClose = <button type="button" class="btn btn-info" onClick={this.manageTaskForm}>Close</button>
      }

    return (
      <div className="container-fluid">
        <div className="row">
        
        
            <Search getSearchValue={this.props.getSearchValue}/>
            
            <Sort changeOrderType = {this.props.changeOrderType} />
            
        
            <div className="col-md-5 col-sm-12">
                  {openAndClose}
            </div>

           

        </div>

        




        
        


      </div>
      
    );
    }
  }
export default Control;
import { render } from '@testing-library/react';
import React,{Component} from 'react';
import Items  from './Items';
import './style.css';
class  TableList extends Component {
    constructor(props){
      super(props);
      
    }

    
  render(){
    let taskOnTable = this.props.task.map((items,index)=>
            <Items key={index}  item={items} indexOntable={index} getId={this.props.getId} getItemEdit={this.props.getItemEdit} />
           
    );
      
    

    return (
      <div className="container-fluid">
        <div className="row">
            <div className="col-md-12 col-sm-12">
            <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Task</th>
            <th scope="col">Level</th>
            <th scope="col"></th>
            <th scope="col"> </th>
          </tr>
        </thead>
  <tbody>
   
     {taskOnTable}
    
  </tbody>
</table>


            </div>
      </div>
      </div>
      
    );

  }
}

export default TableList;
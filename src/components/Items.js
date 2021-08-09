import { render } from '@testing-library/react';
import React,{Component} from 'react';
class  Items extends Component {
  

  checkLevel(){
    
  }
  handleDelete(idDelete){
    this.props.getId(idDelete)
  }
  isEdit(item){
    
    this.props.getItemEdit(item)
  }

  render(){
    let levelStr = <td style={{color: 'blue', fontWeight: 'bold'}}>Low</td>
  
          if(this.props.item.level===1){
            levelStr = <td style={{color: 'yellow', fontWeight: 'bold'}}>Medium</td>
          }else if(this.props.item.level===2){
            levelStr = <td style={{color: 'red', fontWeight: 'bold'}}>High</td>
          }

    return (

     
    <tr>
          <th scope="row">{this.props.indexOntable}</th>
          <td>{this.props.item.name}</td>
          {levelStr}
          <td> <button type="button" class="btn btn-primary" onClick={()=>this.isEdit(this.props.item)}>Edit</button></td>
          <td><button type="button" class="btn btn-danger" onClick={()=>this.handleDelete(this.props.item.id)}>Delete</button></td>
    </tr>
    
      
  );

  }
}

export default Items;
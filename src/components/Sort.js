import { render } from '@testing-library/react';
import React,{Component} from 'react';
class  Sort extends Component {
  constructor(props){
    super(props);
    this.state = {
      orderName: 'Name',
      orderDir: 'ASC'
    }
    this.pickOrder = this.pickOrder.bind(this)
  }

  pickOrder(orderName,orderDir){
     this.setState({
        orderName : orderName,
        orderDir: orderDir
    });
    
    this.props.changeOrderType(orderName,orderDir);
  }
  render(){
    let order = this.state.orderName + "-"+this.state.orderDir;
    return (

    <div className="col-md-3 col-sm-12">
                    <div className="btn-group">
                            <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            {order}
                            </button>
                            <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#" onClick={()=>this.pickOrder('Name','ASC')}>Name-ASC</a></li>
                            <li><a className="dropdown-item" href="#" onClick={()=>this.pickOrder('Name','DESC')}>Name-DESC</a></li>
                            <li><a className="dropdown-item" href="#" onClick={()=>this.pickOrder('Level','ASC')}>Level-ASC</a></li>
                            <li><a className="dropdown-item" href="#" onClick={()=>this.pickOrder('Level','DESC')}>Level-DESC</a></li>
                            </ul>
                </div> 
    </div>
      
   
  );

  }
}

export default Sort;
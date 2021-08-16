import { render } from '@testing-library/react';
import React,{Component} from 'react';
import './style.css';
class  Form extends Component {
  constructor(props){
    super(props)
    this.state={
      levelName: 'High',
      levelValue: 2,
      taskName: '',
      itemEdit: '', 
      taskId: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount(){
    let taskName = ''
    let levelName = ''
    if(this.props.itemEdit!=''){
      taskName = this.props.itemEdit.taskName
        if(this.props.itemEdit.level==0){
          levelName = 'Low'
        }else if(this.props.itemEdit.level==1){
          levelName = 'Medium'
        }else if(this.props.itemEdit.level==2){
          levelName = 'High'
        }
        this.setState({
          taskId: this.props.itemEdit.id,
          taskName: taskName,
          levelName: levelName
        })
    }
    
  }

  componentWillReceiveProps(nextProps){
    let item = nextProps.itemEdit
    let taskName = ''
    let levelName = ''
    if(item!=''){
      taskName = item.taskName
        if(item.level==0){
          levelName = 'Low'
        }else if(item.level==1){
          levelName = 'Medium'
        }else if(item.level==2){
          levelName = 'High'
        }
        this.setState({
          taskId: item.id,
          taskName: taskName,
          levelName: levelName
        })
    }
    
  }
  changeLevel(levelName,levelValue){
      this.setState({
        levelName: levelName,
        levelValue: levelValue
      })
  }
  handleChange(event){
    let target = event.target
    this.setState({
      [target.name] : target.value
    })
  }
  handleSubmit(event){
    this.props.addNewTask(this.state.taskId, this.state.taskName,this.state.levelValue)
    this.setState({
      taskName: '',
      levelName:'',
      taskId: ''
    })
    this.props.closeForm()
    event.preventDefault();
  }
  
  
  render(){
    
    return (
      <div className="row  input-task">
        <div className="col-md-10 col-sm-12">
          <form className='col-md-10' onSubmit={this.handleSubmit}>
            <div className='row'>
                      <div className="col-md-7 col-sm-12">
                          <input type="text" name='taskName' class="form-control" value={this.state.taskName} onChange={this.handleChange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="New task"/>
                      </div>

                        <div className="col-md-3 col-sm-6">
                                  <div className="btn-group">
                                          <button type="button" className="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                            {this.state.levelName}
                                          </button>
                                          <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#" onClick={()=>this.changeLevel('High',2)}>High</a></li>
                                            <li><a className="dropdown-item" href="#" onClick={()=>this.changeLevel('Medium',1)}>Medium</a></li>
                                            <li><a className="dropdown-item" href="#"onClick={()=>this.changeLevel('Low',0)}>Low</a></li>
                                            
                                          </ul>
                                  </div>

                        </div>

                      <div className="col-md-2 col-sm-6">
                        <button type="submit" class="btn btn-success">Submit</button>

                      </div>

                </div>
              
            </form>
          </div>
          
                

          <div className="col-md-2 col-sm-12">
                <button type="button" class="btn btn-dark" onClick={this.props.closeForm}>Cancel</button>
          </div>

      </div>
      
    );

  }
}

export default Form;
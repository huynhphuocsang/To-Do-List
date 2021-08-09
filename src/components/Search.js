import { render } from '@testing-library/react';
import React,{Component} from 'react';
class  Search extends Component {
  
  constructor(props){
    super(props); 
    this.state={
      searchValue: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.clearAll = this.clearAll.bind(this)
  }
  handleChange(event){
      this.setState({
        searchValue: event.target.value
      });
      
  }
  handleSubmit(event){
    this.props.getSearchValue(this.state.searchValue); 
    
    event.preventDefault();
  }
  searchFunction(searchValue){
      console.log(searchValue); 
  }
  clearAll(){
    this.setState({
      searchValue: ''
    });
  }
  render(){
    return (

        <div className="col-md-4 col-sm-12">
            <form className="form-inline search-toolbar" onSubmit={this.handleSubmit}>
              <input className="form-control mr-sm-2" value={this.state.searchValue} type="text" placeholder="Tìm kiếm nhanh" onChange={this.handleChange} />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                <button className="btn btn-outline-warning my-2 my-sm-0" onClick={this.clearAll} type="submit">Clear</button>
            </form>
        </div>
      
   
  );

  }
}

export default Search;
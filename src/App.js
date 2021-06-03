import React, {Component} from 'react';
import './App.css';
import './app.scss';

class App extends Component{
  constructor(){
    super();
    this.state ={
      title: "Add Entry",
      title2: "Entries",
      employeeData : [],
      act: 0,
      index: '',
      count_Malta: 0,
      count_Santrá: 0,
      count_Sönfee: 0
    } 
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let employeeData = this.state.employeeData;
    let name = this.refs.txtName.value;
    let cocktail = this.refs.cocktail.value;
    let points = this.refs.points.value;
    var count_Malta = this.state.count_Malta;
    var count_Santrá = this.state.count_Santrá;
    var count_Sönfee = this.state.count_Sönfee;

    if(name.length===0 || points.length===0 || points<0 || points>10)
      return;

    if(this.state.act ===0){
      let newEmployeeData = {
      "name": name,
      "cocktail": cocktail,
      "points": points
          }
      if(cocktail==="Malta"){
        this.setState({
          count_Malta: count_Malta+parseInt(points)
        })
     }
      else if(cocktail==="Santrá"){
        this.setState({
          count_Santrá: count_Santrá+parseInt(points)
        })
     }
      else
        this.setState({
          count_Sönfee: count_Sönfee+parseInt(points)
        })

      employeeData.push(newEmployeeData);

    }

    else{
      let index=this.state.index ;
      employeeData[index].name = name;
      employeeData[index].cocktail = cocktail;
      employeeData[index].points = points;
      if(this.refs.cocktail.value==="Malta"){
        this.setState({
          count_Malta: count_Malta + parseInt(points)
        })
     }
      else if(this.refs.cocktail.value==="Santrá"){
        this.setState({
          count_Santrá: count_Santrá + parseInt(points)
        })
     }
      else
        this.setState({
          count_Sönfee: count_Sönfee + parseInt(points)
        })
    }


    this.setState({
      employeeData: employeeData,
      act: 0
    })
    this.refs.myForm.reset();
    this.refs.txtName.focus();

  }


  handleReset = (e) =>{
    e.preventDefault();
    this.refs.myForm.reset();
  }

  handleEdit = (i) =>{
    let employeeData = this.state.employeeData[i];
    var count_Malta = this.state.count_Malta;
    var count_Santrá = this.state.count_Santrá;
    var count_Sönfee = this.state.count_Sönfee;
    this.refs.txtName.value = employeeData.name;
    this.refs.cocktail.value = employeeData.cocktail;
    this.refs.points.value = employeeData.points;

    if(this.refs.cocktail.value==="Malta"){
        this.setState({
          count_Malta: count_Malta - this.refs.points.value
        })
     }
      else if(this.refs.cocktail.value==="Santrá"){
        this.setState({
          count_Santrá: count_Santrá - this.refs.points.value
        })
     }
      else
        this.setState({
          count_Sönfee: count_Sönfee - this.refs.points.value
        })


    this.setState({
      
      act: 1,
      index: i
    })


  }

  handleDelete =  (i) =>{
    let employeeData = this.state.employeeData;
    let data = this.state.employeeData[i];
    var count_Malta = this.state.count_Malta;
    var count_Santrá = this.state.count_Santrá;
    var count_Sönfee = this.state.count_Sönfee;
    this.refs.cocktail.value = data.cocktail;
    this.refs.points.value = data.points;

     if(this.refs.cocktail.value==="Malta"){
        this.setState({
          count_Malta: count_Malta - this.refs.points.value
        })
     }
      else if(this.refs.cocktail.value==="Santrá"){
        this.setState({
          count_Santrá: count_Santrá - this.refs.points.value
        })
     }
      else
        this.setState({
          count_Sönfee: count_Sönfee - this.refs.points.value
        })


    employeeData.splice(i,1);

    this.setState({
      employeeData: employeeData
    });

    this.refs.myForm.reset();
    this.refs.txtName.focus();

  }

  handleChange = (e) => {
    this.setState({selectValue:e.target.value});
  }

  render(){
    let employeeData = this.state.employeeData;

    return(
      <div className="App">
      <nav class="navbar">
      <div class="navbar_logo">FE Task</div>
      <ul class="navbar_actions">
      <li>task</li>
      </ul>
      </nav>
       
      <form ref="myForm" className="myForm">
      <h1>{this.state.title}</h1>
        <label>Name</label>
        <input type="text" ref="txtName" placeholder="Enter your name" className="formField" />
        <label>Select cocktail</label>
        <select ref="cocktail" value={this.state.selectValue} onChange={this.handleChange} className="formField">
          <option value="Malta" selected>Malta</option>
          <option value="Santrá">Santra</option>
          <option value="Sönfee">Sonfee</option>
        </select>
        <label>Points (0 to 10)</label>
        <input type="number" min="0" max="10" ref="points" placeholder="Give points" className="formField" />
        <button class="add" onClick = {e => this.handleSubmit(e)}>Add</button>
        <button onClick = {e => this.handleReset(e)}>Reset</button>
      </form>
      <pre className="listView">
      <table className='table'>
        <h1>{this.state.title2}</h1>
        <div class="list_leaderBoard__3T4JK">
        <div class="list_leaderItem__2_UTL">#1 Malta({this.state.count_Malta})</div>
        <div class="list_leaderItem__2_UTL">#2 Sönfee({this.state.count_Sönfee})</div>
        <div class="list_leaderItem__2_UTL">#3 Santrá({this.state.count_Santrá})</div>
        </div>
        <tr>
          <th>Name</th>
          <th>Cocktail</th>
          <th>Points (0 to 10)</th>
          <th>Action</th>
        </tr>

        {employeeData.map((data,i) => 
              <tr key={i}>
              <td>{data.name}</td>
              <td>{data.cocktail}</td>
              <td>{data.points}</td>
              <td><button onClick = {e => this.handleEdit(i)}>Edit</button>
              <button onClick = {e => this.handleDelete(i)}>Delete</button>
              </td>
              </tr> 
           )
        }
      </table>
      </pre>
      </div>
      );
  }
}

export default App;
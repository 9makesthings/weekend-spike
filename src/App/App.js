import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Form from '../Form/form';
import TableRow from '../TableRow/TableRow';

class App extends Component {

  state = {
    allFormData: []
  }

  componentDidMount(){
    this.getFormData();
  }

  getFormData = () => {
    axios({
      method: 'GET',
      url: '/taco'
    })
    .then( (response) => {
      console.log( `GET works!` );
      this.setState({
        allFormData: response.data,
      });
    })
    .catch( (error) => {
      console.log( `Couldn't GET data.`, error );
      alert(`Couldn't GET data.`);
    })
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h2>A Form!</h2>
        </header>
        <div>
          <Form getFormData={this.getFormData} />
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Food</th>
                <th>Animal</th>
                <th>Email?</th>
              </tr>
            </thead>
            <tbody>
              {this.state.allFormData.map( (item, i) =>
                  <TableRow key={i} item={item} />
                )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  state = {
    newForm: {
      name: '',
      food: '',
      animal: ''
    },
    allFormData: []
  }

  componentDidMount(){
    this.getFormData();
  }

  getFormData = () => {
    axios({
      method: 'GET',
      url: '/data'
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

  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      newForm: {
        ...this.state.newForm,
        [event.target.name]: event.target.value
      }
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    axios({
      method: 'POST',
      url: '/data',
      data: this.state.newForm
    })
    .then( (response) => {
      console.log( `POST successful!` );
      this.getFormData();
      this.setState({
        newForm: {
          name: '',
          food: '',
          animal: ''
        }
      });
    })
    .catch( (error) =>{
      console.log( `Couldn't POST.`, error );
      alert(`Couldn't POST.`);
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h2>A Form!</h2>
        </header>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Name" name="name"
                  onChange={this.handleChange} />
            <input type="text" placeholder="Favorite Food" name="food"
                  onChange={this.handleChange} />
            <input type="text" placeholder="Favorite Animal" name="animal"
                  onChange={this.handleChange} />

            <button type="submit">Submit</button>
          </form>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Food</th>
                <th>Animal</th>
              </tr>
            </thead>
            <tbody>
              {this.state.allFormData.map( (item, i) =>
                    <tr key={i}>
                      <td>{item.name}</td>
                      <td>{item.food}</td>
                      <td>{item.animal}</td>
                    </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;

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
      url: '/taco',
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

  // Nodemail!
  // contact.jsx
  sendEmail (name, email, message) {
    fetch('/send', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message
      })
    })
    .then((res) => res.json())
    .then((res) => {
      console.log('here is the response: ', res);
    })
    .catch((err) => {
      console.error('here is the error: ', err);
    })
  }

  handleEmail = (event) => {
    console.log( event.target.value );
    let name = 'Hieu';
    let email = '9makesthings@gmail.com';
    let message = 'This is the message I\'d like to send.';

    this.sendEmail( name, email, message );
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
                <th>Email?</th>
              </tr>
            </thead>
            <tbody>
              {this.state.allFormData.map( (item, i) =>
                    <tr key={i}>
                      <td>{item.name}</td>
                      <td>{item.food}</td>
                      <td>{item.animal}</td>
                      <td>
                        <button onClick={this.handleEmail} value={item}>Send!</button>
                      </td>
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

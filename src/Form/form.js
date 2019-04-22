import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {

    state = {
      newForm: {
        name: '',
        food: '',
        animal: ''
      }
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
            this.props.getFormData();
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
        return(
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
            </div>

        );
    }
}

export default Form;
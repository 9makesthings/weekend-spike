import React, { Component } from 'react';


class TableRow extends Component {

    sendText = `This is an email about ${this.props.item.name}. 
                They like to eat ${this.props.item.food} 
                and visit the zoo to see ${this.props.item.animal}.`;

    sendHtml = `
        <div>
            <h2>About ${this.props.item.name} </h2>
            <p> A table about their favorite things.</p>
            <table>
                <thead>
                    <tr>
                        <th>Favorite Food</th>
                        <th>Favorite Animal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${this.props.item.food}</td>
                        <td>${this.props.item.animal}</td>
                    </tr>
                </tbody>
            </table>
        </div>`;

  // Nodemail!
  // contact.jsx
  sendEmail (name, email, subject, text, html) {
    fetch('/send', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        subject: subject,
        text: text,
        html: html
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
    let subject = 'This is the message I\'d like to send.';
    let text = this.sendText;
    let html = this.sendHtml;

    this.sendEmail( name, email, subject, text, html );
  }

    render() {
        let item = this.props.item;

        return(
            <tr>
                <td>{item.name}</td>
                <td>{item.food}</td>
                <td>{item.animal}</td>
                <td>
                    <button onClick={this.handleEmail} value={item}>Send!</button>
                </td>
            </tr>
        );
    }
}

export default TableRow;









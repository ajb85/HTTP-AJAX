import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default class AddFriend extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", age: "", email: "" };
  }

  handleSubmit = e => {
    e.preventDefault();
    let { name, age, email } = this.state;
    if (name && age && email) {
      this.postNewFriend({ name, age, email });
    } else {
      console.log("Empty Input");
    }
  };

  postNewFriend = friend => {
    const url = "http://localhost:5000/friends";
    axios
      .post(url, friend)
      .then(res => {
        console.log(res);
        this.props.addFriend();
      })
      .catch(err => console.log(err));
  };

  handleInputChange = (e, property) => {
    let stateProperty = this.state[property];
    stateProperty = e.target.value;
    this.setState({ [property]: stateProperty });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Label>
          <h1>Add a Friend to Your List!</h1>
        </Form.Label>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={e => this.handleInputChange(e, "name")}
            type="text"
            placeholder="Enter Friend's Name"
          />
        </Form.Group>
        <Form.Group controlId="age">
          <Form.Label>Age</Form.Label>
          <Form.Control
            onChange={e => this.handleInputChange(e, "age")}
            type="Number"
            placeholder="Enter Friend's Age"
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={e => this.handleInputChange(e, "email")}
            type="email"
            placeholder="Enter Friend's Email"
          />
        </Form.Group>
        <Button type="submit" variant="success">
          Add Friend
        </Button>
      </Form>
    );
  }
}

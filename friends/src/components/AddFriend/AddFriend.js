import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import styles from "./AddFriend.module.scss";

export default class AddFriend extends Component {
  constructor(props) {
    super(props);
    let name = "";
    let age = "";
    let email = "";
    if (props.friend) {
      name = props.friend.name;
      age = props.friend.age;
      email = props.friend.email;
    }
    this.state = { name, age, email };
  }

  handleSubmit = e => {
    e.preventDefault();
    let { name, age, email } = this.state;
    if (name && age && email) {
      if (this.props.friend) {
        this.postEditFriend({ id: this.props.friend.id, name, age, email });
      } else {
        this.postNewFriend({ name, age, email });
      }
    } else {
      console.log("Empty Input");
    }
  };

  postNewFriend = friend => {
    const url = "http://localhost:5000/friends";
    axios
      .post(url, friend)
      .then(res => this.props.getFriends())
      .catch(err => console.log(err));
  };

  postEditFriend = friend => {
    const url = `http://localhost:5000/friends/${friend.id}`;
    axios
      .put(url, friend)
      .then(res => {
        this.props.getFriends();
        this.props.toggleUpdating();
      })
      .catch(err => console.log(err));
  };

  handleInputChange = (e, property) => {
    let stateProperty = this.state[property];
    stateProperty = e.target.value;
    this.setState({ [property]: stateProperty });
  };

  render() {
    let className = "";
    let formClass = styles.addFriend;
    let buttonText = "Add Friend";
    if (this.props.friend) {
      className = "hide";
      buttonText = "Edit Friend";
      formClass = styles.editFriend;
    }
    return (
      <Form className={formClass} onSubmit={this.handleSubmit}>
        <Form.Label>
          <h1 className={styles[className]}>Add a Friend to Your List!</h1>
        </Form.Label>
        <Form.Group controlId="name">
          <Form.Label className={styles[className]}>Name</Form.Label>
          <Form.Control
            onChange={e => this.handleInputChange(e, "name")}
            type="text"
            placeholder="Enter Friend's Name"
            value={this.state.name}
          />
        </Form.Group>
        <Form.Group controlId="age">
          <Form.Label className={styles[className]}>Age</Form.Label>
          <Form.Control
            onChange={e => this.handleInputChange(e, "age")}
            value={this.state.age}
            type="Number"
            placeholder="Enter Friend's Age"
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label className={styles[className]}>Email</Form.Label>
          <Form.Control
            onChange={e => this.handleInputChange(e, "email")}
            type="email"
            placeholder="Enter Friend's Email"
            value={this.state.email}
          />
        </Form.Group>
        <Button className={styles.centerBtn} type="submit" variant="success">
          {buttonText}
        </Button>
      </Form>
    );
  }
}

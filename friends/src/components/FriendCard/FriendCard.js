import React, { Component } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import AddFriend from "../AddFriend";
/*

*/
export default class FriendCard extends Component {
  constructor(props) {
    super(props);
    this.state = { updating: false };
  }

  deleteFriend(friend) {
    const url = `http://localhost:5000/friends/${friend.id}`;
    axios
      .delete(url, friend)
      .then(res => this.props.getFriends())
      .catch(err => console.log(err));
  }

  render() {
    const { friend } = this.props;
    /* IF the user is not updating! */
    let buttonText = "Update";
    let cardContent = [
      <Card.Title key={`${friend.id}`}>
        {friend.name}, {friend.age}
      </Card.Title>,
      <Card.Text key={`${friend.name}${friend.id}`}>{friend.email}</Card.Text>
    ];

    /* IF the user is updating! */
    if (this.state.updating) {
      buttonText = "Cancel";
      cardContent = (
        <AddFriend
          friend={friend}
          getFriends={this.props.getFriends}
          toggleUpdating={() =>
            this.setState({ updating: !this.state.updating })
          }
        />
      );
    }
    return (
      <Card style={{ width: "300px" }}>
        <Card.Body>
          {cardContent}
          <Button
            variant="primary"
            onClick={() => this.setState({ updating: !this.state.updating })}
          >
            {buttonText}
          </Button>
          <Button
            variant="danger"
            onClick={() => this.deleteFriend(this.props.friend)}
          >
            Unfriend
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

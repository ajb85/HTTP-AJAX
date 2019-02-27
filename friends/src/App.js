import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import FriendCard from "./components/FriendCard";
import AddFriend from "./components/AddFriend";

class App extends Component {
  componentDidMount() {
    this.updateFriendsState();
  }

  updateFriendsState = () => {
    const url = "http://localhost:5000/friends";
    axios
      .get(url)
      .then(res => this.setState({ friends: res.data }))
      .catch(err => console.log(err));
  };
  render() {
    let friends = ["...Loading..."];
    if (this.state && this.state.friends) {
      friends = this.state.friends.map(friend => (
        <FriendCard key={friend.id} friend={friend} />
      ));
    }
    return (
      <div className="App">
        <AddFriend addFriend={this.updateFriendsState} />
        <div className="friends">{friends}</div>
      </div>
    );
  }
}

export default App;

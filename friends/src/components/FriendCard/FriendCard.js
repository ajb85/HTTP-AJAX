import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
/*

*/
export default function FriendCard({ friend }) {
  return (
    <Card style={{ width: "300px" }} key={friend.id}>
      <Card.Body>
        <Card.Title>
          {friend.name}, {friend.age}
        </Card.Title>
        <Card.Text>{friend.email}</Card.Text>
        <Button variant="danger">Unfriend</Button>
      </Card.Body>
    </Card>
  );
}

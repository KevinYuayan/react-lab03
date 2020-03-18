import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";

function CreateUser(props) {
  const [user, setUser] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    city: "",
    address: "",
    program: "",
    studentNumber: "",
    phonenumber: ""
  });
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/";

  const saveUser = e => {
    setShowLoading(true);
    e.preventDefault();
    const data = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      password: user.password,
      city: user.city,
      address: user.address,
      studentNumber: user.studentNumber,
      phonenumber: user.phonenumber,
      program: user.program
    };
    axios
      .post(apiUrl, data)
      .then(result => {
        setShowLoading(false);
        props.history.push("/show/" + result.data._id);
      })
      .catch(error => {
        console.log(error);
        setShowLoading(false);
      });
  };

  const onChange = e => {
    e.persist();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      <Jumbotron>
        <Form onSubmit={saveUser}>
          <Form.Group>
            <Form.Label> First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter first name"
              value={user.firstName}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label> Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter last name"
              value={user.lastName}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              id="email"
              rows="3"
              placeholder="Enter email"
              value={user.email}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              name="username"
              id="username"
              placeholder="Enter user name"
              value={user.username}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              name="password"
              id="password"
              placeholder="Enter password"
              value={user.password}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Student Number</Form.Label>
            <Form.Control
              type="text"
              name="studentNumber"
              id="studentNumber"
              placeholder="Enter studentNumber"
              value={user.studentNumber}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              id="address"
              placeholder="Enter address"
              value={user.address}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              id="city"
              placeholder="Enter city"
              value={user.city}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phonenumber"
              id="phonenumber"
              placeholder="Enter phonenumber"
              value={user.phonenumber}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Program</Form.Label>
            <Form.Control
              type="text"
              name="program"
              id="program"
              placeholder="Enter program"
              value={user.program}
              onChange={onChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(CreateUser);

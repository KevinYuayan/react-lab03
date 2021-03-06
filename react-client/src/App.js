import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
//
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./App.css";
//
import List from "./components/List";
import EditUser from "./components/EditUser";
import EditCourse from "./components/EditCourse";

import CreateUser from "./components/CreateUser";
import ShowUser from "./components/ShowUser";
import ShowCourse from "./components/ShowCourse";
import StudentCourse from "./components/StudentCourse";

import Home from "./components/Home";
import Login from "./components/Login";
import ListCourse from "./components/ListCourse";
//
function App() {
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/list">List of Users</Nav.Link>
            <Nav.Link href="/ListCourse">List of Courses</Nav.Link>
            <Nav.Link href="/create">Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div>
        <Route render={() => <Home />} path="/home" />
        <Route render={() => <Login />} path="/login" />
        <Route render={() => <List />} path="/list" />
        <Route render={() => <EditUser />} path="/edit/:id" />
        <Route render={() => <CreateUser />} path="/create" />
        <Route render={() => <ShowUser />} path="/show/:id" />
        <Route render={() => <ShowCourse />} path="/showcourse/:id" />
        <Route render={() => <ListCourse />} path="/ListCourse" />
        <Route render={() => <EditCourse />} path="/editcourse/:id" />
        <Route render={() => <StudentCourse />} path="/StudentCourse" />
      </div>
    </Router>
  );
}
//<Route render ={()=> < App />} path="/" />
export default App;

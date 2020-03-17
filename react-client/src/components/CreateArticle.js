import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";
import React, { useState } from "react";

//
function CreateArticle(props) {
  //
  const username = props.screen;
  console.log("props.screen", props.screen);
  const [article, setArticle] = useState({
    _id: "",
    courseCode: "",
    courseName: "",
    username: "",
    section: "",
    semester: ""
  });
  const [showLoading, setShowLoading] = useState(false);
  //
  const apiUrl = "http://localhost:3000/api/articles";
  //
  const saveArticle = e => {
    setShowLoading(true);
    e.preventDefault();
    const data = {
      courseCode: article.courseCode,
      courseName: article.courseName,
      username: username,
      semester: article.semester,
      section: article.section
    };
    //
    axios
      .post(apiUrl, data)
      .then(result => {
        setShowLoading(false);
        console.log("results from save article:", result.data);
        props.history.push("/showarticle/" + result.data._id);
      })
      .catch(error => setShowLoading(false));
  };
  //
  const onChange = e => {
    e.persist();
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2> Add a Course {username} </h2>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      <Jumbotron>
        <Form onSubmit={saveArticle}>
          <Form.Group>
            <Form.Label> course Code</Form.Label>
            <Form.Control
              type="text"
              name="courseCode"
              id="courseCode"
              placeholder="Enter courseCode"
              value={article.courseCode}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label> Course Name</Form.Label>
            <Form.Control
              type="text"
              name="courseName"
              id="courseName"
              placeholder="Enter courseName"
              value={article.courseName}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label> Section </Form.Label>
            <Form.Control
              type="text"
              name="section"
              id="section"
              placeholder="Enter section"
              value={article.section}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label> Semester </Form.Label>
            <Form.Control
              type="text"
              name="semester"
              id="semester"
              placeholder="Enter semester"
              value={article.semester}
              onChange={onChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Save Course
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(CreateArticle);

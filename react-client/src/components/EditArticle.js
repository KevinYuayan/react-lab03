import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";

function EditArticle(props) {
  console.log("edituser props:", props.match.params);
  const [article, setArticle] = useState({
    _id: "",
    courseCode: "",
    courseName: "",
    semester: "",
    section: ""
  });
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/articles/" + props.match.params.id;
  console.log(apiUrl);
  console.log(article.courseCode);

  console.log(article.courseName);

  //runs only once after the first render
  useEffect(() => {
    setShowLoading(false);
    //call api
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setArticle(result.data);
      console.log(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const updateArticle = e => {
    setShowLoading(true);
    e.preventDefault();

    console.log("result");
    console.log(article.courseCode);
    console.log(article.courseName);

    const data = {
      courseCode: article.courseCode,
      courseName: article.courseName,
      semester: article.semester,
      section: article.section
    };
    axios
      .put(apiUrl, data)
      .then(result => {
        console.log(result);
        console.log("after calling put to update", result.data);
        setShowLoading(false);
        props.history.push("/showarticle/" + props.match.params.id);
      })
      .catch(error => setShowLoading(false));
  };
  //runs when user enters a field
  const onChange = e => {
    e.persist();
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      <Jumbotron>
        <Form onSubmit={updateArticle}>
          <Form.Group>
            <Form.Label> courseCode</Form.Label>
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
            <Form.Label> course Name</Form.Label>
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
            <Form.Label> section Name</Form.Label>
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
            <Form.Label> semester Name</Form.Label>
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
            Update Course
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(EditArticle);

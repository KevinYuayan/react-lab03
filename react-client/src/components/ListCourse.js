import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { withRouter } from "react-router-dom";

function List(props) {
  //console.log("props.match.params", props.match.params.id);
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/courses";

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      console.log("results from courses", result.data);

      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const showDetail = id => {
    props.history.push({
      pathname: "/showcourse/" + id
    });
  };
  console.log("data");

  return (
    <div>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      <ListGroup>
        {data.map((item, idx) => (
          <ListGroup.Item
            key={idx}
            action
            onClick={() => {
              showDetail(item._id);
            }}
          >
            {item.courseName}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default withRouter(List);

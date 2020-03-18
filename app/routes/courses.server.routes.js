const users = require("../controllers/users.server.controller");
const courses = require("../controllers/courses.server.controller");
var express = require("express");

//
module.exports = function(app) {
  app
    .route("/api/courses")
    .get(courses.list)
    .post(users.requiresLogin, courses.create);
  //

  app
    .route("/api/courses/:courseId")
    .get(courses.read)
    .get(courses.courseByID)
    //.put(users.requiresLogin, courses.update)
    .put(courses.update)
    // .put(users.requiresLogin, courses.hasAuthorization, courses.update)
    //.delete(users.requiresLogin, courses.hasAuthorization, courses.delete);
    .delete(courses.delete);
  //
  app.param("courseId", courses.courseByID);
};

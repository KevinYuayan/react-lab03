const users = require("../../app/controllers/users.server.controller");
const articles = require("../../app/controllers/articles.server.controller");
var express = require("express");

//
module.exports = function(app) {
  app
    .route("/api/articles")
    .get(articles.list)
    .post(users.requiresLogin, articles.create);
  //

  app
    .route("/api/articles/:articleId")
    .get(articles.read)
    .get(articles.articleByID)
    //.put(users.requiresLogin, articles.update)
    .put(articles.update)
    // .put(users.requiresLogin, articles.hasAuthorization, articles.update)
    //.delete(users.requiresLogin, articles.hasAuthorization, articles.delete);
    .delete(articles.delete);
  //
  app.param("articleId", articles.articleByID);
};

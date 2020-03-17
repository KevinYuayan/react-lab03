﻿const mongoose = require("mongoose");
const Article = mongoose.model("Article");
const User = require("mongoose").model("User");

//
function getErrorMessage(err) {
  if (err.errors) {
    for (let errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
  } else {
    return "Unknown server error";
  }
}
//
exports.create = function(req, res) {
  const article = new Article();
  article.courseCode = req.body.courseCode;
  article.courseName = req.body.courseName;
  article.section = req.body.section;
  article.semester = req.body.semester;
  //article.creator = req.body.username;
  console.log(req.body);
  //
  //
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      return getErrorMessage(err);
    }
    //
    req.id = user._id;
    console.log("user._id", req.id);
  }).then(function() {
    article.creator = req.id;
    console.log("req.user._id", req.id);

    article.save(err => {
      if (err) {
        console.log("error", getErrorMessage(err));

        return res.status(400).send({
          message: getErrorMessage(err)
        });
      } else {
        res.status(200).json(article);
      }
    });
  });
};
//
// exports.list = function(req, res) {
//   Article.find()
//     .sort("-created")
//     .populate("creator", "firstName lastName fullName")
//     .exec((err, articles) => {
//       if (err) {
//         return res.status(400).send({
//           message: getErrorMessage(err)
//         });
//       } else {
//         res.status(200).json(articles);
//       }
//     });
// };

exports.list = function(req, res, next) {
  // Use the 'User' instance's 'find' method to retrieve a new user document
  Article.find({}, function(err, article) {
    if (err) {
      return next(err);
    } else {
      res.json(article);
    }
  });
};
//
exports.articleByID = function(req, res, next, id) {
  Article.findById(id)
    .populate("creator", "firstName lastName fullName")
    .exec((err, article) => {
      if (err) return next(err);
      if (!article) return next(new Error("Failed to load article " + id));
      req.article = article;
      console.log("in articleById:", req.article);
      next();
    });
};
//
exports.read = function(req, res) {
  res.status(200).json(req.article);
};
//
exports.update = function(req, res) {
  console.log("in update:", req.article);
  const article = req.article;
  article.courseCode = req.body.courseCode;
  article.courseName = req.body.courseName;
  article.section = req.body.section;
  article.semester = req.body.semester;
  article.save(err => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.status(200).json(article);
    }
  });
};
//
// exports.delete = function(req, res) {
//   const article = req.article;
//   article.remove(err => {
//     if (err) {
//       return res.status(400).send({
//         message: getErrorMessage(err)
//       });
//     } else {
//       res.status(200).json(article);
//     }
//   });
// };

exports.delete = function(req, res, next) {
  Article.findByIdAndRemove(req.article.id, req.body, function(err, article) {
    if (err) return next(err);
    res.json(article);
  });
};
//The hasAuthorization() middleware uses the req.article and req.user objects
//to verify that the current user is the creator of the current article
exports.hasAuthorization = function(req, res, next) {
  console.log("in hasAuthorization33: ", req.article.creator);
  //console.log("in hasAuthorization: ", req.user._id);
  console.log(req.user);
  console.log(req);

  // if (req.article.creator.id !== req.user._id) {
  //   return res.status(403).send({
  //     message: "User is not authorized"
  //   });
  // }
  next();
};

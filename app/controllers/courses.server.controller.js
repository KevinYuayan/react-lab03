const mongoose = require("mongoose");
const Course = mongoose.model("Course");
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
  const course = new Course();
  course.courseCode = req.body.courseCode;
  course.courseName = req.body.courseName;
  course.section = req.body.section;
  course.semester = req.body.semester;
  //course.creator = req.body.username;
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
    course.creator = req.id;
    console.log("req.user._id", req.id);

    course.save(err => {
      if (err) {
        console.log("error", getErrorMessage(err));

        return res.status(400).send({
          message: getErrorMessage(err)
        });
      } else {
        res.status(200).json(course);
      }
    });
  });
};
//
// exports.list = function(req, res) {
//   Course.find()
//     .sort("-created")
//     .populate("creator", "firstName lastName fullName")
//     .exec((err, courses) => {
//       if (err) {
//         return res.status(400).send({
//           message: getErrorMessage(err)
//         });
//       } else {
//         res.status(200).json(courses);
//       }
//     });
// };

exports.list = function(req, res, next) {
  // Use the 'User' instance's 'find' method to retrieve a new user document
  Course.find({}, function(err, course) {
    if (err) {
      return next(err);
    } else {
      res.json(course);
    }
  });
};
//
exports.courseByID = function(req, res, next, id) {
  Course.findById(id)
    .populate("creator", "firstName lastName fullName")
    .exec((err, course) => {
      if (err) return next(err);
      if (!course) return next(new Error("Failed to load course " + id));
      req.course = course;
      console.log("in courseById:", req.course);
      next();
    });
};
//
exports.read = function(req, res) {
  res.status(200).json(req.course);
};
//
exports.update = function(req, res) {
  console.log("in update:", req.course);
  const course = req.course;
  course.courseCode = req.body.courseCode;
  course.courseName = req.body.courseName;
  course.section = req.body.section;
  course.semester = req.body.semester;
  course.save(err => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.status(200).json(course);
    }
  });
};
//
// exports.delete = function(req, res) {
//   const course = req.course;
//   course.remove(err => {
//     if (err) {
//       return res.status(400).send({
//         message: getErrorMessage(err)
//       });
//     } else {
//       res.status(200).json(course);
//     }
//   });
// };

exports.delete = function(req, res, next) {
  Course.findByIdAndRemove(req.course.id, req.body, function(err, course) {
    if (err) return next(err);
    res.json(course);
  });
};
//The hasAuthorization() middleware uses the req.course and req.user objects
//to verify that the current user is the creator of the current course
exports.hasAuthorization = function(req, res, next) {
  console.log("in hasAuthorization33: ", req.course.creator);
  //console.log("in hasAuthorization: ", req.user._id);
  console.log(req.user);
  console.log(req);

  // if (req.course.creator.id !== req.user._id) {
  //   return res.status(403).send({
  //     message: "User is not authorized"
  //   });
  // }
  next();
};

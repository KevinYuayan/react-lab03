const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ArticleSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },

  courseCode: {
    type: String,
    default: "",
    required: "courseCode cannot be blank"
  },
  courseName: {
    type: String,
    default: "",
    required: "coursename is required"
  },
  section: {
    type: String,
    default: "",
    required: "section is required"
  },
  semester: {
    type: String,
    default: "",
    required: "semester is required"
  },

  creator: {
    type: Schema.ObjectId,
    ref: "User"
  }
});
mongoose.model("Article", ArticleSchema);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
// const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (remote or local)
mongoose
  .connect("mongodb://localhost:27017/mydb")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Define a Schema and Model for MongoDB
const UserSchema = new mongoose.Schema(
  {
    student_id: { type: String, required: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    years: { type: Number, required: true },
    major: { type: String, required: true },
    course: { type: [String], required: true },
    kumromg: { type: Number, required: true },
  },
  { versionKey: false }
);

const User = mongoose.model("User", UserSchema);

// get course
const CourseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    score_data: {
      midterm: { type: Number, required: true },
      final: { type: Number, required: true },
      others: { type: Number, required: true },
    },
    grade_data: {
      A: { type: Number, required: true },
      B_plus: { type: Number, required: true },
      B: { type: Number, required: true },
      C_plus: { type: Number, required: true },
      C: { type: Number, required: true },
      D_plus: { type: Number, required: true },
      D: { type: Number, required: true },
      F: { type: Number, required: true },
    },
    students_score: [
      {
        student_id: { type: String, required: true },
        midterm_score: { type: Number, required: true },
        final_score: { type: Number, required: true },
        others: { type: Number, required: true },
        kumrong: { type: String, required: true },
      },
    ],
    teacher_id: { type: Number, required: true },
    Section: { type: String, required: true },
    Semester: { type: String, required: true },
    credit: { type: Number, required: true },
    full_name: { type: String, required: true },
  },
  { versionKey: false }
);

const Course = mongoose.model("Course", CourseSchema);

//get teacher
const TeacherSchema = new mongoose.Schema(
  {
    teacher_id: { type: Number, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    office: { type: String, required: true },
    email: { type: String, required: true },
    tel: { type: Number, required: true },
    course: { type: [String], required: true },
    note: { type: String, required: true },
  },
  { versionKey: false }
);

const Teacher = mongoose.model("Teacher", TeacherSchema);

const AdminSchema = new mongoose.Schema({
  Username: { type: String, required: true },
  password: { type: String, required: true },
});

const Admin = mongoose.model("Admin", AdminSchema);

//login get all when login

app.post("/api/login", async (req, res) => {
  const { student_id, password } = req.body;

  if (!student_id || !password) {
    return res
      .status(400)
      .json({ message: "Student ID and password are required" });
  }

  const user = await User.findOne({ student_id });
  if (!user) return res.status(401).json({ message: "User not found" });

  // Check password
  if (password.toString() !== user.password.toString()) {
    return res.status(401).json({ message: "Invalid student ID or password" });
  }

  const courses = await Course.find({
    "students_score.student_id": student_id,
  });

  if (courses.length === 0) {
    return res.json({
      user: {
        student_id: user.student_id,
        first_name: user.first_name,
        last_name: user.last_name,
        years: user.years,
        major: user.major,
        course: user.course,
        kumromg: user.kumromg,
      },
      message: "No courses found for this student.",
    });
  }

  // Get unique teacher IDs from the courses
  const teacherIds = [...new Set(courses.map((course) => course.teacher_id))];

  // Fetch teacher details
  const teachers = await Teacher.find({ teacher_id: { $in: teacherIds } });
  const courseData = courses.map((course) => {
    const teacher = teachers.find((t) => t.teacher_id === course.teacher_id);
    const studentScore = course.students_score.find(
      (score) => score.student_id === student_id
    );
    return {
      course_name: course.name,
      teacher_name: teacher
        ? `${teacher.first_name} ${teacher.last_name}`
        : "N/A",
      office: teacher ? teacher.office : "N/A",
      score_data: course.score_data,
      grade_data: course.grade_data,
      student_scores: studentScore ? studentScore : null,
      Section: course.Section,
      Semester: course.Semester,
      credit: course.credit,
      full_name: course.full_name,
      tel: teacher.tel,
      email: teacher.email,
      note: teacher.note,
    };
  });

  // Respond with user details and course data
  res.json({
    user: {
      student_id: user.student_id,
      first_name: user.first_name,
      last_name: user.last_name,
      years: user.years,
      major: user.major,
      course: user.course,
      kumromg: user.kumromg,
    },
    courses: courseData,
  });
});

// user
app.post("/api/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: "Failed to add user", error: err.message });
  }
});
app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.delete("/api/users/student/:student_id", async (req, res) => {
  try {
    const { student_id } = req.params;
    console.log("Attempting to delete user with student_id:", student_id);

    const user = await User.findOneAndDelete({ student_id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err.message);
    res
      .status(500)
      .json({ message: "Failed to delete user", error: err.message });
  }
});

//course
//Tracking api
app.post("/api/courses", async (req, res) => {
  const { student_id } = req.body;
  const courses = await Course.find({
    "students_score.student_id": student_id,
  });

  const teacherIds = [...new Set(courses.map((course) => course.teacher_id))];

  // Fetch teacher details
  const teachers = await Teacher.find({ teacher_id: { $in: teacherIds } });
  const courseData = courses.map((course) => {
    const teacher = teachers.find((t) => t.teacher_id === course.teacher_id);
    const studentScore = course.students_score.find(
      (score) => score.student_id === student_id
    );
    return {
      course_name: course.name,
      teacher_name: teacher
        ? `${teacher.first_name} ${teacher.last_name}`
        : "N/A",
      student_scores: studentScore ? studentScore : null,
      full_name: course.full_name,
    };
  });

  res.json(courseData);
});

//app.post("/api/courses",async (req , res) => {
//const course = new Course(req.body);
//try {
//await course.save();
//res.json(course);
//} catch (err) {
//res.status(400).json({ message: "Failed to add course", error: err.message });
//}
//});
app.put("/api/courses/students/kumrong", async (req, res) => {
  const { courseName, user_Id, date, kumrong } = req.body;
  const updatedCourse = await Course.findOneAndUpdate(
    { name: courseName, "students_score.student_id": user_Id },
    { $set: { "students_score.$.kumrong": kumrong || date } },
    { new: true }
  );

  res.json({
    message: "Kumrong updated to 'pending' successfully",
    updatedCourse,
  });
});

app.put("/api/courses/students/already", async (req, res) => {
  const { courseName, user_Id, already } = req.body;
  const updatedCourse = await Course.findOneAndUpdate(
    { name: courseName, "students_score.student_id": user_Id },
    { $set: { "students_score.$.kumrong": already || "already" } },
    { new: true }
  );

  res.json({
    message: "Kumrong updated to 'already' successfully",
    updatedCourse,
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

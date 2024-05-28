const db = require("mongoose");

(async () => {
  await db.connect(process.env.DB_URI);
  console.log(`DB connection successful`);
})();

const AdminSchema = new db.Schema({
  username: String,
  password: String,
});

const UserSchema = new db.Schema({
  username: String,
  password: String,
  purchased_courses: [
    {
      type: db.Schema.Types.ObjectId,
      ref: "Courses",
    },
  ],
});

const CourseSchema = new db.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
});

const Admin = db.model("Admin", AdminSchema);
const User = db.model("User", UserSchema);
const Courses = db.model("Courses", CourseSchema);

function convertToID(id) {
  return new db.Types.ObjectId(id);
}

module.exports = {
  Admin,
  User,
  Courses,
  convertToID,
};

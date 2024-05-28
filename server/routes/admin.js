const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const adminAuth = require("../middlewares/admin");
const { Admin, Courses } = require("../models");

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existing_user = await Admin.findOne({
      username,
    });

    if (existing_user?.username) {
      return res.status(401).json({
        mssg: "Admin already exists!",
      });
    }

    const newAdmin = new Admin({
      username,
      password,
    });

    await newAdmin.save();

    res.json({
      mssg: "Admin created successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      mssg: "Internal Server Error",
    });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({
      username,
      password,
    });

    if (!admin) {
      return res.status(401).json({
        mssg: "No user with this username/password exists",
      });
    }

    const token = jwt.sign(
      {
        username,
      },
      process.env.JWT_PASSWORD
    );
    return res.json({
      mssg: "Signed in successfully",
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      mssg: `Internal Server Issue`,
    });
  }
});

router.post("/course", adminAuth, async (req, res) => {
  try {
    const { title, description, price, imageLink } = req.body;
    const course = new Courses({
      title,
      description,
      price: parseInt(price),
      imageLink,
    });

    await course.save();

    res.json({
      mssg: "Course added successfully",
      title: course.title,
      id: course._id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      mssg: "Internal Server Error",
    });
  }
});

router.get("/course", adminAuth, async (req, res) => {
  try {
    const courses = await Courses.find({});
    if (!courses) courses = {};
    res.json({ courses: courses });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      mssg: "Internal Server Error",
    });
  }
});

module.exports = router;

const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const userAuth = require("../middlewares/user");
const { User, Courses, convertToID } = require("../models");

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existing_user = await User.findOne({
      username,
    });

    if (existing_user?.username) {
      return res.status(401).json({
        mssg: "User already exists!",
      });
    }

    const newUser = new User({
      username,
      password,
    });

    await newUser.save();

    res.json({
      mssg: "User created successfully",
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

    const user = await User.findOne({
      username,
      password,
    });

    if (!user) {
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

router.get("/course", userAuth, async (req, res) => {
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

router.post("/course/:courseId", userAuth, async (req, res) => {
  try {
    const username = req.username;
    const courseId = convertToID(req.params.courseId);

    const course = await User.updateOne(
      {
        username: username,
      },
      {
        $push: {
          purchased_courses: courseId,
        },
      }
    );

    if (!course.matchedCount) {
      return res.status(404).json({
        mssg: "Course not found",
      });
    }

    return res.json({
      mssg: "Course purchased",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      mssg: "Internal server error",
    });
  }
});

router.get("/purchasedCourses", userAuth, async (req, res) => {
  try {
    const username = req.username;

    const courses = await User.find({
      username,
    }).populate("purchased_courses");

    if (!courses) {
      return res.status(404).json({
        mssg: "No courses found",
      });
    }

    return res.json({
      courses: courses[0].purchased_courses,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      mssg: "Internal server error",
    });
  }
});

module.exports = router;

const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../users/users-model");

router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findBy({ username }).first();
    if (user) {
      console.log(user);
      return res.status(409).json({
        message: "Username is already taken, please choose another one"
      });
    } else {
      if (!username || !password) {
        res.status(400).json({
          message: "Provide for all fields please"
        });
      }
    }

    const newUser = await Users.add(req.body);
    if (newUser) {
      const payload = {
        userId: newUser.id
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET);
      return res.status(201).json({ newUser, token });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const authError = {
    message: "Invalid credentials"
  };

  try {
    let { username, password } = req.body;
    const user = await Users.findBy({ username }).first();
    if (!user) {
      return res.status(401).json(authError);
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).json(authError);
    }

    const payload = {
      userId: user.id
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.json({
      message: `Welcome ${user.username}!`,
      token: token
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

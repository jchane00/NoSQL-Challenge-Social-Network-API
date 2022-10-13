const express = require("express");
const User = require("../../models/user");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await User.create(userData);
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.json(allUsers);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "thoughts friends"
    );
    res.json(user);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.post("/:userId/friends/:friendId", async (req, res) => {
  try {
    const userOne = await User.findById(req.params.userId);
    const userTwo = await User.findById(req.params.friendId);

    userOne.friends.push(userTwo._id);
    await userOne.save();
    res.json(userOne);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const changes = await User.findByIdAndUpdate(req.params.id, req.body);
    res.json(changes);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const changes = await User.findByIdAndRemove(req.params.id);
    res.json(changes);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.delete("/:userId/friends/:friendId", async (req, res) => {
  try {
    const changes = await User.findByIdAndRemove(req.params.id);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
module.exports = router;

const express = require("express");
const { updateMany } = require("../../models/thought");
const thoughtModel = require("../../models/thought");
const userModel = require("../../models/user");

const router = express.Router();

router.post("/", async (req, res) => {
  const thought = await thoughtModel.create(req.body);
  const user = await userModel.findById(req.body.userId);
  user.thoughts.push(thought._id);
  await user.save();
  res.json(thought);
});

router.get("/", async (req, res) => {
    try {
      const allThoughts = await thoughtModel.find({});
      res.json(allThoughts);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const thought = await thoughtModel.findById(req.params.id);
      res.json(thought);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const update = await thoughtModel.findByIdAndUpdate(req.params.id, req.body);
      res.json(update);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const changes = await thoughtModel.findByIdAndRemove(req.params.id);
      res.json(changes);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
      const changes = await thoughtModel.findByIdAndUpdate(req.params.thoughtId, {
        reactions:{
          $pull:{
            _id: req.params.reactionId
          }
        }
      })
      res.json(changes)
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });
  router.post('/:thoughtId/reactions', async (req, res) => {
    try {
      // const existingThought = await thoughtModel.findById(req.params.thoughtId)
      // existingThought.reactions.push(req.body)
      // await existingThought.save()
      // res.json(existingThought)
      const changes = await thoughtModel.findByIdAndUpdate(req.params.thoughtId, {
        reactions:{
          $push:req.body
        }
      })
      res.json(changes)
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });
module.exports = router;

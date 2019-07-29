const express = require('express')
const Posts = require('./posts-model.js')
const router = express.Router()

router.post('/', async ( req, res ) => {
  const { title, contents } = req.body
  try {
    if ( !title || !contents ) {
      res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
      const post = await Posts.insert(req.body);
      res.status(201).json(post);
    }
  }
  catch (error) {
    res.status(500).json({ error: "There was an error while saving the post to the database" });
  }
})

router.post('/:id/comments', async ( req, res ) => {
  const { text } = req.body
  const { id } = req.params
  try{
    const post = await Posts.findById(id)
    if(!post) {
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    } else if(!text) {
      res.status(400).json({ errorMessage: "Please provide text for the comment." })
    } else {
      const comment = await Posts.insert(req.body)
      res.status(201).json(comment)
    }
  }
  catch (error) {
    res.status(500).json({ error: "There was an error while saving the comment to the database" })
  }
})


module.exports = router;

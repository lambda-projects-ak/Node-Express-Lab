const express = require('express');
const db = require('../data/db');
const router = express.Router();

router.get('/', (req, res) => {
  db.find()
    .then(posts => res.status(200).json({ success: true, posts }))
    .catch(err =>
      res.status(err.code).json({
        success: false,
        error: 'The posts information could not be retrieved.'
      })
    );
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(posts => res.status(200).json({ success: true, posts }))
    .catch(err =>
      res.status(err.code).json({
        success: false,
        error: 'The posts information could not be retrieved.'
      })
    );
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(deleted => res.status(204).end())
    .catch(err =>
      res.status(err.code).json({ success: false, message: err.message })
    );
});

router.post('/', (req, res) => {
  const { title, contents } = req.body;
  const newPost = { title, contents };

  if (!title || !contents) {
    return res.status(500).json({
      success: false,
      errorMessage: 'Please provide title and contents for the post.'
    });
  }
  db.insert(newPost)
    .then(post => {
      res.status(201).json({ success: true, post });
    })
    .catch(err => res.status(err.code).json({ success: false, message }));
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const change = req.body;

  db.update(id, change)
    .then(updated => {
      if (updated) {
        res.status(200).json({ success: true, updated });
      } else {
        res.status(404).json({
          success: false,
          message: "Cannot find the hub you're looking for"
        });
      }
    })
    .catch(err => res.status(err.code).json({ success: false, message }));
});

module.exports = router;

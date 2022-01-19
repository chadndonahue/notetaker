const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
});

// GET Route for notes
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'))
});

// Wildcard route to direct users back to index page
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
});

module.exports = router;

// front end get routes for the list items on the left
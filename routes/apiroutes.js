const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { readAndAppend } = require('../helper/Utils');

// unsure if i need the notes here with the back slash
router.get('/notes', (req, res) => {
    console.log("This is the get route")
    // need to change this to the fs version
    fs.readFile('./db/db.json', 'utf8', (err,data) => {
        console.log(data)
        res.json(JSON.parse(data))});
});


// This is extra credit and optional.
// This works through filtering through everything inside of the db, then grabs everything that isnt matching that id, copies it, and makes a new file excluding the one that was meant to be deleted(deletion through exclusion).
router.delete('/notes/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    fs.readFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        // Make a new array of all tips except the one with the ID provided in the URL
        const result = json.filter((note) => note.note_id !== noteId);

        // Save that array to the filesystem
        fs.writeFile('./db/db.json', result);

        // Respond to the DELETE request
        res.json(`Item ${noteId} has been deleted 🗑️`);
    });
});


router.post('/notes', (req, res) => {
    
    console.log("you made it");

    const { title, text } = req.body;

if (req.body) {
    const newNote = {
        title,
        text,
        id: uuidv4(),
    };
    // need to change this to fs.writeifle and read file if i want the same functionality or just write the function in a util folder cx
    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
    } else {
    res.error('Error in adding note');
    }
});

module.exports = router;
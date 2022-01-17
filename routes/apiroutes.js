const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { readAndAppend } = require('../helper/Utils');


router.get('/', (req, res) => {
    // need to change this to the fs version
    fs.readFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});


// This is extra credit and optional.
// This works through filtering through everything inside of the db, then grabs everything that isnt matching that id, copies it, and makes a new file excluding the one that was meant to be deleted(deletion through exclusion).
router.delete('/:note_id', (req, res) => {
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


router.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

if (req.body) {
    const newNote = {
        title,
        text,
        note_id: uuidv4(),
    };
    // need to change this to fs.writeifle and read file if i want the same functionality or just write the function in a util folder cx
    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
    } else {
    res.error('Error in adding note');
    }
});

module.exports = router;
const router = require('express').Router()
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');


router.get('/', (req, res) => {
    // need to change this to the fs version
    fs.readFile('./db/tips.json').then((data) => res.json(JSON.parse(data)));
});


// This is extra credit and optional.
// This works through filtering through everything inside of the db, then grabs everything that isnt matching that id, copies it, and makes a new file excluding the one that was meant to be deleted(deletion through exclusion).
router.delete('/:tip_id', (req, res) => {
    const tipId = req.params.tip_id;
    fs.readFile('./db/tips.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all tips except the one with the ID provided in the URL
        const result = json.filter((tip) => tip.tip_id !== tipId);
  
        // Save that array to the filesystem
        writeToFile('./db/tips.json', result);
  
        // Respond to the DELETE request
        res.json(`Item ${tipId} has been deleted 🗑️`);
      });
  });




router.post('/', (req, res) => {
    console.log(req.body);

    const { username, topic, tip } = req.body;

if (req.body) {
    const newTip = {
        username,
        tip,
        topic,
        tip_id: uuidv4(),
    };
    // need to change this to fs.writeifle and read file if i want the same functionality
    readAndAppend(newTip, './db/tips.json');
    res.json(`Tip added successfully 🚀`);
    } else {
    res.error('Error in adding tip');
    }
});

module.exports = router;
const router = require('express').Router()
const fs = require('fs')


tips.get('/', (req, res) => {
    // need to change this to the fs version
    readFromFile('./db/tips.json').then((data) => res.json(JSON.parse(data)));
});



tips.post('/', (req, res) => {
    console.log(req.body);

    const { username, topic, tip } = req.body;

if (req.body) {
    const newTip = {
        username,
        tip,
        topic,
        tip_id: uuidv4(),
    };
    // need to change this to fs.writeifle
    readAndAppend(newTip, './db/tips.json');
    res.json(`Tip added successfully 🚀`);
    } else {
    res.error('Error in adding tip');
    }
});

module.exports = router;
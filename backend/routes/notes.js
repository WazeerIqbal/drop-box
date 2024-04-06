//we bring express and router
const express = require('express');
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");

//We use validator to check the notes are empty or not
const { body, validationResult } = require('express-validator');

//we use mongoose notes model here
var Note = require("../models/Note")

//Route:1 Get all the the notes  
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        //we fetch all notes using user id
        const notes = await Note.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error 4")

    }

})

//Route:2 Add the notes: Using Post request, "/api/notes/addnote"  
router.post('/addnotes', fetchuser, [
    body('title', 'Enter a Valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description ').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        //If there is error return bad reques
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //if no error we save new note in new 
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote)


    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error 400")

    }

})

//Route:3 Update the note "/api/notes/updatenote:id" get request
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    //using destructure we bring here from body
    const { title, description, tag } = req.body;

    //create a newNote object so we save here 
    const newNote = {};
    if (title) {
        newNote.title = title;
    }
    if (description) {
        newNote.description = description;
    }
    if (tag) {
        newNote.tag = tag;
    }

    //Find the note to be updated, and then update the note.

    let note = await Note.findById(req.params.id);
    if (!note) {
        res.status(404).send("Not Found")
    }
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed")
    }
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note })
})

//Route 4: Delete the note we use "/api/notes/deletenote:id" get request 
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //Find the note to be updated, and then update the note.

        let note = await Note.findById(req.params.id);
        if (!note) {
            res.status(404).send("Not Found")
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note Has been delete", note: note })
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error 400")
    }
})


module.exports = router
import React, { useState } from "react";
import { json } from "react-router-dom";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"

    const initialNotes = []
    const [notes, setNotes] = useState(initialNotes)

    //get notes
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headrs: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            }

        })
        const json = await response.json();
        setNotes(json)
    }

    //Add a note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })


        })
        const note = response.json();
        setNotes(notes.concat(note))
    }

    //Delete a note
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
        })
        const json = response.json();


        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote)
    }

    //Edit a note
    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json)

        let newNotes = JSON.parse(JSON.stringify(notes))

        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }

        }
        setNotes(newNotes)
    }


    return (
        //what ever we weap inside this context 
        <noteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}


export default NoteState;
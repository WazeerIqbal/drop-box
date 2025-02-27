//In this component we get  all notes

import React, { useContext, useRef, useState } from 'react'

//We bring Note Context here
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';
import Addnote from './Addnote';

import Alert from './Alert';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Notes = () => {
    const context = useContext(noteContext);
    let navigate = useNavigate();
    //We fetech the state and function using contextAPI
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        if (localStorage.getItem("token")) {
            getNotes();

        }
        else {
            // navigate("/login")
        }
    })

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" })

    const ref = useRef(null)
    const refClose = useRef(null)

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.edescription, etag: currentNote.tag })
    }


    const handleClick = (e) => {

        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();


    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Addnote />
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" onChange={onChange} />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" ename='description' onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" ename='tag' onChange={onChange} />
                                </div>



                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Data</button>
                        </div>
                    </div>
                </div>
            </div>

            <Alert message='This is a alert' />
            <div className='row'>

                {notes.map((note) => {
                    return < NoteItem note={note} updateNote={updateNote} key={note._id} />;
                })}
            </div>
        </>
    )
}

export default Notes

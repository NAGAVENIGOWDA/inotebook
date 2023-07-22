import React, { useContext, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

export default function Notes() {
  const context = useContext(noteContext);
  const { notes, addNote,editNote, fetchNotes } = context;
  let index = 0;
  const ref = useRef(null);
  const refClose=useRef(null);
  const [note, setNote] = useState({id:'', etitle:"", edescription:"", etag:"" });

  React.useEffect(() => {
    fetchNotes();
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id:currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
    
  };

  const handleChange = (event) => {
    setNote((prevNote) => {
      return {
        ...prevNote,
        [event.target.name]: event.target.value,
      };
    });
  };
  const handleClick = (event) => {
  
     
     editNote(note.id,note.etitle,note.edescription,note.etag)
     refClose.current.click()
     
  };

  return (
    <div className="container">
      <AddNote />

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="p-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    <b>Title</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={handleChange}
                    value={note.etitle}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    <b>Description</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={handleChange}
                    value={note.edescription}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    <b>Tag</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    aria-describedby="emailHelp"
                    onChange={handleChange}
                    value={note.etag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row ">
      <h1>Your Notes : </h1>
        
        <div className="container mx-2">
        
        {notes.length===0 &&" No notes to display"}
        </div>
        
        {notes.map((notes) => {
          return (
            <NoteItem key={index++} notes={notes} updateNote={updateNote} />
          );
        })}
      </div>
    </div>
  );
}

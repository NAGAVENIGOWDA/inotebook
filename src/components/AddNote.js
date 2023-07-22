import React,{useContext, useState} from 'react'
import noteContext from "../context/notes/noteContext";


export default function AddNote() {
    const context=useContext(noteContext);
  const {addNote}=context;
  const [note,setNote]=useState({title:"",description:"",tag:""});
  const handleChange=(event)=>{
    setNote((prevNote)=>{
        return(
            {
                ...prevNote,
                [event.target.name]:event.target.value

            }
        )
    })
  }
  const handleClick=(event)=>{
    event.preventDefault();
    addNote(note.title,note.description,note.tag);
    setNote({title:"",description:"",tag:""}) //empty the fields after adding note
  }
  return (
    <div className="container my-5 ">
        <h1>Add your Note</h1>
      <form className="p-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            <b>Title</b>
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name='title'
            aria-describedby="emailHelp"
            onChange={handleChange}
            value={note.title}
            minLength={5}
            required
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            <b>Description</b>
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name='description'
            onChange={handleChange}
            value={note.description}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
          <b>Tag</b>
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name='tag'
            aria-describedby="emailHelp"
            onChange={handleChange}
            value={note.tag}
          />
          </div>
       
        <button type="submit" className="btn btn-primary" onClick={handleClick} disabled={note.title.length<5 ||note.description.length<5}>
          Add Note
        </button>
      </form>
      
    
    </div>
  )
}

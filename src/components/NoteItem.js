import React,{useContext} from "react";
import noteContext from "../context/notes/noteContext";

export default function NoteItem(props) {
  const context = useContext(noteContext);

  const { deleteNote } = context;
  const { notes ,updateNote} = props;
  return ( 
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title"> {notes.title}</h5>
          <p className="card-text">
            
            {notes.description}
          </p>
          <p className="card-text">
            
            {notes.tag}
          </p>
          <i className="fa-solid fa-trash mx-3" onClick={()=>{deleteNote(notes._id); props.showAlert("deleted successfully","success")}} ></i>
          <i className="fa-regular fa-pen-to-square" onClick={()=>{updateNote(notes) }}></i>
        </div>
      </div>
    </div>
  );
}

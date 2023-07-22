import React from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const url = " http://localhost:5000";
  let Notes = [];

  const [notes, setNotes] = React.useState(Notes);

  //fetch all notes

  const fetchNotes = async () => {
    const response = await fetch(`${url}/api/notes/fetchallnotes`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiNjQxODAzYTRkNTUwNTI2MzZlZDUwIn0sImlhdCI6MTY4OTc0MzkyOH0.C2N8RXCZK4rtJ8Y0yhHGOGomLueVveS3ar3OqotTH-4",
      },
    });

    const json = await response.json();
    console.log(json);
    setNotes(json)
  };

  //Add Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${url}/api/notes/addnote`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiNjQxODAzYTRkNTUwNTI2MzZlZDUwIn0sImlhdCI6MTY4OTc0MzkyOH0.C2N8RXCZK4rtJ8Y0yhHGOGomLueVveS3ar3OqotTH-4",
      },

      body: JSON.stringify({ title, description, tag }),
    });

    const note =await response.json()

    setNotes(notes.concat(note));
  };
  //delete Note

  const deleteNote = async (id) => {
    const response = await fetch(`${url}/api/notes/deletenote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiNjQxODAzYTRkNTUwNTI2MzZlZDUwIn0sImlhdCI6MTY4OTc0MzkyOH0.C2N8RXCZK4rtJ8Y0yhHGOGomLueVveS3ar3OqotTH-4",
      },
    });
    console.log(response.json())
    let newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  //edit Note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${url}/api/notes/updatenote/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiNjQxODAzYTRkNTUwNTI2MzZlZDUwIn0sImlhdCI6MTY4OTc0MzkyOH0.C2N8RXCZK4rtJ8Y0yhHGOGomLueVveS3ar3OqotTH-4",
      },

      body: JSON.stringify({ title, description, tag }),
    });
let updateNotes=JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      
      if (updateNotes[index]._id === id) {
        updateNotes[index].title = title;
        updateNotes[index].description = description;
        updateNotes[index].tag = tag;
         break;
      }
     
    }
    setNotes(updateNotes)
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, fetchNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

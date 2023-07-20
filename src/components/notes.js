import React,{useContext} from 'react'
import noteContext from "../context/notes/noteContext";
import NoteItem from './NoteItem';
export default function Notes() {
    const context=useContext(noteContext);
  const {notes,setNotes}=context;
  let index=0;
  return (
    <div className='row '>
        {notes.map((notes)=>{return (
                <NoteItem key={index++} notes={notes}/>
      )
      
      })}
      
    </div>
  )
}

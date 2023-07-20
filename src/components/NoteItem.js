import React from "react";

export default function NoteItem(props) {
  const { notes } = props;
  return (
    <div className="col-md-3 my-3">

      <div className="card" >
        <div className="card-body">
          <h5 className="card-title">  {notes.title}</h5>
          <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum repudiandae, doloremque modi amet illo quaerat, soluta vitae, dolor incidunt laboriosam suscipit architecto eaque nam sed reprehenderit dolore optio blanditiis dignissimos?
           {notes.description}
          </p>
          
        </div>
      </div>
    </div>
  );
}

import React from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  let Notes=[
    {
      "_id": "64b786174f5a8230719b1db0",
      "user": "64b641803a4d55052636ed50",
      "title": "new note",
      "description": "dont be lazy",
      "tag": "goodGirl",
      "date": "2023-07-19T06:42:51.536Z",
      "__v": 0
    },
    {
      "_id": "64b8e70173eeca8fa77bc310",
      "user": "64b641803a4d55052636ed50",
      "title": "my note",
      "description": "wanna be productive",
      "tag": "goodGirl",
      "date": "2023-07-20T07:48:09.202Z",
      "__v": 0
    },
    {
      "_id": "64b8e72a73eeca8fa77bc312",
      "user": "64b641803a4d55052636ed50",
      "title": "sweet home",
      "description": "I love my family",
      "tag": "goodGirl",
      "date": "2023-07-20T07:48:09.202Z",
      "__v": 0
    },
    {
        "_id": "64b8e72a73eeca8fa77bc312",
        "user": "64b641803a4d55052636ed50",
        "title": "sweet home",
        "description": "I love my family",
        "tag": "goodGirl",
        "date": "2023-07-20T07:48:09.202Z",
        "__v": 0
      },
      {
        "_id": "64b8e72a73eeca8fa77bc312",
        "user": "64b641803a4d55052636ed50",
        "title": "sweet home",
        "description": "I love my family",
        "tag": "goodGirl",
        "date": "2023-07-20T07:48:09.202Z",
        "__v": 0
      }
  ]
  const[notes,setNotes] =React.useState(Notes)
  
  return (
    <NoteContext.Provider value={{notes,setNotes}}>{props.children}</NoteContext.Provider>
  );
};

export default NoteState;

import React  from "react";
import Notes from "./notes"


export default function Home(props) {
  const {showAlert}=props;
  return (
   <div>
    
      <Notes showAlert={showAlert} />
   </div>
  );
}

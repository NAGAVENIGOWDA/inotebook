import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";

function App() {
  return (
    <>
    <NoteState>
    <BrowserRouter>
     <Navbar/>
     <div className="container">
     <Routes>
      <Route exact path="/" element={<Home/>}></Route>
      <Route exact path="/about" element={<About/>}></Route>
     </Routes>
     </div>
    </BrowserRouter>
   </NoteState>
    </>
  );
}

export default App;

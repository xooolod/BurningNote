import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import Note from "./components/Note/Note.jsx";
import NoteSuccess from "./components/Note-Sucess/NoteSuccess.jsx";

const App = () => (
    <Router>
        <Header />
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/note" element={<div>Please provide a link.</div>} /> 
            <Route path="/note/:link" element={<Note />} /> 
			<Route path="/note-success/:link" element={<NoteSuccess />} />
            <Route path="*" element={<div>Page not found!</div>} /> {/*TODO: 404 Page*/}
        </Routes>
    </Router>
);

export default App;
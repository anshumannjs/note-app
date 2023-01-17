import './App.css';
import Editor from './Components/Editor';
import NoteState from './ContextApi/NoteState';
import NoteList from './Components/NoteList';
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom';

function App() {



  return (
    <BrowserRouter>
    <NoteState>
    <div className="App flex">
      <Routes>
      <Route path='/note-app' element={<NoteList></NoteList>}/>
      <Route path='/editor' element={<Editor></Editor>}/>
      </Routes>
    </div>
    </NoteState>
    </BrowserRouter>
  );
}

export default App;

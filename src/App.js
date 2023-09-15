
import './App.css';
import Archive from './components/Archive';
import TaskGenerator from './components/TaskGenerator';
import { Route, Routes} from "react-router-dom";
import { useState } from 'react';

function App() {



  const [archiveTasks, setArchiveTasks] = useState([]);

  const archiveTask = (task) => {
    console.log(task);
    setArchiveTasks((current) =>{
      return [...current, task];
    } )
    
  }

function removeAllArchived() {
    setArchiveTasks([]);
  }

  const removeArchivedTask = (id) => {
    setArchiveTasks( current => {
      return current.filter(task => task.id !== id)
    })
  }
  
  return (
    <div>
      <Routes>
        <Route path='/' element={<TaskGenerator archiveTask={archiveTask} />} />
        <Route path='/archive' element={<Archive archiveTasks={archiveTasks}
        removeArchivedTask={removeArchivedTask}
        removeAllArchived={removeAllArchived}/>} />

      </Routes>
    </div>
  );
}

export default App;

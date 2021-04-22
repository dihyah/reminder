import { useState } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer.js'
import About from './components/About.js'

const App = () => {
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([
        {
            id: 1,
            text: 'Doctors Appointment',
            day: 'Feb 5th at 2:30pm',
            reminder: true,
        },
        {
            id: 2,
            text: 'Meeting at School',
            day: 'Feb 6th at 1:30pm',
            reminder: true,
        },
        {
            id: 3,
            text: 'Food Shopping',
            day: 'Feb 5th at 2:30pm',
            reminder: false,
        },
    ])

//Add task
    const addTask = (task) => {
        const id = Math.floor(Math.random() * 10000) + 1
        console.log(id)
        const newTask = { id, ...task }
        setTasks([...tasks, newTask])
    }
//Delete task 
    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }

//Toggle reminder
    const toggleReminder = (id) => {
        setTasks(tasks.map((tasks) => 
            tasks.id === id ? { 
                ...tasks, reminder: !tasks.reminder 
            } : tasks
            )
        )
    }

  return (
    <div className="container">
      <Header onAdd={
          () => setShowAddTask(!showAddTask)
          }
        showAdd={showAddTask}
      />
      { showAddTask && <AddTask onAdd={addTask} /> }
      {tasks.length > 0 ? ( 
              <Tasks tasks={tasks} 
              onDelete={deleteTask} 
              onToggle={toggleReminder} /> 
          ) : ( 'No task to show...')
      }
        <About />
        <Footer />
    </div>
  );
}

export default App;

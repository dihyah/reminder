import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import List from './components/List'
import AddTask from './components/AddTask'
import Footer from './components/Footer.js'
import About from './components/About.js'

const App = () => {
    const [showAddTask, setShowAddTask] = useState(false)
    const [list, setList] = useState([])

        /*
        useEffect(() => {
            localStorage.setItem('task', JSON.stringify(list))
        }, [list]);
    */

    useEffect(() => {
        const getList = async () => {
            const listFromServer = await fetchList()
            setList(listFromServer)
        }

        getList()
    }, [])

    //Fetch list
    const fetchList = async () => {
        const res = await fetch('http://localhost:5000/list')
        const data = await res.json()

        return data
    }

    //Fetch tasks
    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/list/${id}`)
        const data = await res.json()

        return data
    }

//Add task
    const addTask = async (task) => {
        const res = await fetch('http://localhost:5000/list', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })

        const data = await res.json()

        setList([...list, data])
        /*
            const id = Math.floor(Math.random() * 10000) + 1
        console.log(id)
        const newTask = { id, ...task }
        setList([...list, newTask])
            */
    }

//Delete task 
    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/list/${id}`, {
            method: 'DELETE',
        })
        setList(list.filter((task) => task.id !== id))
    }

//Toggle reminder
    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id)
        const updTask = { ...taskToToggle,
        reminder: !taskToToggle.reminder }

        const res = await fetch(`http://localhost:5000/list/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updTask)
        })

        const data = await res.json()

        setList(list.map((list) => 
            list.id === id ? { 
                ...list, reminder: data.reminder 
            } : list
            )
        )
    }

    //returns elements
  return (
      <Router>
          <div className="container">
              <Header onAdd={
                  () => setShowAddTask(!showAddTask)
              }
              showAdd={showAddTask}
              />
      <Route path='/' exact render={(props) => (
          <>
      { showAddTask && <AddTask onAdd={addTask} /> }
      {list.length > 0 ? ( 
          <List list={list} 
          onDelete={deleteTask} 
          onToggle={toggleReminder} /> 
      ) : ( 'No task to show...')
      }

          </>
      )}
      />
              <Route path='/about' component={About} />
              <Footer />
          </div>
      </Router>
  );
}

export default App;


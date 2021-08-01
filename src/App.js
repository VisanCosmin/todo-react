import './App.css';
import React, { useState , useEffect } from 'react';


const initialState = JSON.parse(localStorage.getItem("todos")) === null ? [] : JSON.parse(localStorage.getItem("todos")) ;

function App() {
  const [input,setInput] = useState("");
  const [todos,setTodos] = useState(initialState);
  const [filteredTodos,setFilteredTodos] = useState([]);
  const [filter,setFilter] = useState("all");


  const handleInput = (event) => {
    if(event.key === "Enter"){
      const newTodo = { done : false 
                      , value : event.target.value 
                      };
      setTodos( todos.concat([newTodo]) );
      setInput("");
    }
  };

  useEffect( () => {
      switch(filter){
        case "active":
          setFilteredTodos(todos.filter( todo => !todo.done ));
        break;
        case "completed":
          setFilteredTodos(todos.filter( todo => todo.done ));
        break;
        default:{
          setFilteredTodos(todos);
        }
      }
      localStorage.setItem("todos" , JSON.stringify(todos));


  } , [todos,filter] );

  const toggleTodo = (id) => (val) => {
    const newTodos = [...todos];
    newTodos[id].done = val;
    setTodos(newTodos);
  }

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.done));
  };

  return (
    <div className="main">
      <h2>Todo App</h2>
      <input type="text" value={input} onKeyPress={handleInput} onChange={e => setInput(e.target.value)} />
      <ul>
        {
          filteredTodos.map( (todo,key) => <TodoElement todo={todo} id={key} toggleTodo={toggleTodo(key)} /> )
        }
      </ul>
      { todos.filter(todo => !todo.done).length > 1 && <p>{todos.filter(todo => !todo.done).length} items left</p> }
      { todos.filter(todo => !todo.done).length === 1 && <p>1 item left</p> }
      <div className="buttons">
        <button value="all" 
                onClick={ () => setFilter("all") } 
                className={filter === "all" && "selected"} >All</button>
        <button value="active" 
                onClick={ () => setFilter("active") } 
                className={filter === "active" && "selected"} >Active</button>
        <button value="completed" 
                onClick={ () => setFilter("completed") } 
                className={filter === "completed" && "selected"} >Completed</button>

        <button onClick={clearCompleted} className="clear">Clear completed</button>
      </div>
    </div>
  );
}

function TodoElement(props){
  return (
    <li id={props.id} key={props.id}>
      <input type="checkbox" checked={props.todo.done} onChange={e => props.toggleTodo(e.target.checked)}/>
      {props.todo.done === true ? <s>{props.todo.value}</s> : props.todo.value}
    </li>
  );
}

export default App;

import { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { db } from "./firebase_config";
import firebase from "firebase";
import TodoListItem from "./Todo";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");

  useEffect(() => {
    getTodos();
  }, []); // blank to run only on first launch

  function getTodos() {
    db.collection("todos").onSnapshot(function (querySnapshot) {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          inprogress: doc.data().inprogress,
        }))
      );
    });
  }

  function addTodo(e) {
    e.preventDefault();

    if (todoInput === "") {
      alert("Todo can't be empty!");
    } else {
      db.collection("todos").add({
        inprogress: true,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        todo: todoInput,
      });

      setTodoInput("");
    }
  }

  return ( 
    <div className = "App" >
      <div style = {{
        backgroundColor: '#ffe268',
        width: 500,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 20
      }} 
      >
    <h1> Smalawad Todos App 🚀 </h1> 
    <form>
      <TextField className = "todo-textfield"
        id = "standard-basic"
        label = "Write a Todo"
        value = {todoInput}
      onChange = {(e) => setTodoInput(e.target.value)}
      /> 
      <Button type = "submit"
        variant = "contained"
        onClick = {addTodo}
        style = {{display: "none"}} 
      >
      Default 
      </Button> 
      </form>

      <div className = "todo-status" > {
        todos.map((todo) => ( 
        <TodoListItem 
          todo = {todo.todo}
          inprogress = {todo.inprogress}
          id = {todo.id}
       />
        ))
      } 
      </div> 
    </div> 
  </div>
  );
}

export default App;
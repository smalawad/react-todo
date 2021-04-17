
import React from 'react'
import { ListItem, ListItemText, Button, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { db } from "./firebase_config";
import "./Todo.css";

export default function TodoListItem({ todo, inprogress, id }) {
    
    function toggleInProgress () {
        db.collection("todos").doc(id).update({
            inprogress: !inprogress,
        });
    }

    function deleteTodo (){
        db.collection("todos").doc(id).delete();
    }
    return (
        <div style={{ display: "flex" }} >
            <ListItem>
                <ListItemText 
                    primary={todo} 
                    secondary={inprogress ? "In Progress " : "Completed"}
                />
            </ListItem>
            
            <Button className="todo-progress"
                onClick={toggleInProgress}     
            >
                {inprogress ? "Done" : "UnDone"}
            </Button>
            
            <IconButton aria-label="delete">
                <DeleteIcon onClick={deleteTodo} style={{ padding: "18px", margin: "1px", color:"red"}}/>
            </IconButton>
        </div>
    )
}

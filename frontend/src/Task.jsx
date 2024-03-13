import React from "react";
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
`;

const NewButton = styled.button
`
 cursor: pointer;

 align-items: center;
 background: red;
 border: none;
 border-radius: 5px;
 box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
 background: #e62222;
`

function Task(props) {

    function deleteTask(columnId, index, taskId) {
        const column = props.state.columns[columnId];
        const newTaskIds = Array.from(column.taskIds);
        newTaskIds.splice(index, 1);
    
        const tasks = props.state.tasks;
        const {[taskId]: oldTask, ...newTasks} = tasks;
    
        props.setState({
            ...props.state,
            tasks: {
                ...newTasks
            },
            columns: {
                ...props.state.columns,
                [columnId]: {
                    ...column,
                    taskIds: newTaskIds
                }
            }
        });
    }

    return (
        <Draggable draggableId={props.task.id} index={props.index}>
            {provided => (
                <Container {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    {props.task.content}
                    <NewButton onClick={() => deleteTask(props.columnId, props.index, props.task.id)}> X</NewButton>
                </Container>
            )}
        </Draggable>
    )
}

export default Task;
import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './Task';
import AddTask from './AddTask';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;
`;
const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div`
  padding: 8px;
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

function Column(props) {

    function deleteColumn(columnId, index) {
        const columnTasks = props.state.columns[columnId].taskIds;
    
        const finalTasks = columnTasks.reduce((previousValue, currentValue) => {
            const {[currentValue]: oldTask, ...newTasks} = previousValue;
            return newTasks;
        }, props.state.tasks);
        
        const columns = props.state.columns;
        const {[columnId]: oldColumn, ...newColumns} = columns; 
    
        const newColumnOrder = Array.from(props.state.columnOrder);
        newColumnOrder.splice(index, 1);
    
        props.setState({
            tasks: {
                ...finalTasks
            },
            columns: {
                ...newColumns
            },
            columnOrder: newColumnOrder
        });
    }

    return (
        <Draggable draggableId={props.column.id} index={props.index}>
            {provided => (
                <Container {...provided.draggableProps} ref={provided.innerRef}>
                    <Title {...provided.dragHandleProps}>
                        {props.column.title}
                        <NewButton onClick={() => deleteColumn(props.column.id, props.index)}>X</NewButton>
                    </Title>
                    <Droppable droppableId={props.column.id} type="task">
                        {provided => (
                            <TaskList {...provided.droppableProps} ref={provided.innerRef}>
                                {
                                    props.tasks.map((task, index) => 
                                        (<Task key={task.id} task={task} index={index} columnId={props.column.id} state={props.state} setState={props.setState} />)
                                    )
                                }
                                {provided.placeholder}
                            </TaskList>
                        )}
                    </Droppable>
                    <AddTask columnId={props.column.id} state={props.state} setState={props.setState} />
                </Container>
            )}
        </Draggable>
    )
}

export default Column;
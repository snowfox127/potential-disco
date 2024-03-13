import React, { useState } from "react";
import styled from 'styled-components';

const ButtonSet = styled.button`
display: inline-block;
border:none; 
border-radius:10px; 
padding:10px;
`

function AddColumn(props) {
    const [showNewColumnButton, setShowNewColumnButton] = useState(true);
    const [value, setValue] = useState("");

    function handleInputChange(event) {
        setValue(event.target.value);
    }

    function onNewColumnButtonClick() {
        setShowNewColumnButton(false);
    }

    function onNewColumnInputComplete() {
        setShowNewColumnButton(true);
        addNewColumn(value);
        setValue("");
    }

    function addNewColumn(title) {
        const newColumnOrder = Array.from(props.state.columnOrder);
        const newColumnId = 'column-' + Math.floor(Math.random() * 100000);
        newColumnOrder.push(newColumnId);
    
        const newColumn = {
            id: newColumnId,
            title: title,
            taskIds: [],
        };
    
        props.setState({
            ...props.state,
            columnOrder: newColumnOrder,
            columns: {
                ...props.state.columns,
                [newColumnId]: newColumn
            }
        });
    }

    return (
        <div>
            {
                showNewColumnButton ?
                <ButtonSet onClick={onNewColumnButtonClick}>New Column</ButtonSet> :
                <input type="text" value={value} onChange={handleInputChange} onBlur={onNewColumnInputComplete} />
            }
        </div>
    )
}

export default AddColumn;
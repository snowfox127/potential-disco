import React from "react";
import { useHistory } from 'react-router-dom'
import styled from 'styled-components';

const ButtonSet = styled.button`

border:none; 
border-radius:10px; 
padding:10px;
display: inline-block;
`

function Logout(props){
    const history = useHistory();
    function logOutUser(){
        localStorage.removeItem('token');
        history.push("/login")

    }
    return(
        <ButtonSet onClick={logOutUser}>Logout</ButtonSet>
    )
}

export default Logout;
import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import styled from 'styled-components';

const Container = styled.div`
  margin: auto;
  width: 50%;
  border: 3px solid black;
  padding: 20px;
  border-radius: 10px;
  
`;

const LogForm = styled.p`
  margin: auto;
  width: 30%;
  
  padding: 10px;
`;

const ButtonSet = styled.button`
width: 30%; 
border:none; 
border-radius:10px; 
padding:10px;`

function Register(props) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const history = useHistory();

    async function createUser() {
        const formData = {
            username: username,
            password_hash: password,
        }

        const response = await fetch('http://localhost:8000/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();

        return data;
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        createUser().then(data => {
            props.setToken(data.access_token);
            localStorage.setItem('token', JSON.stringify(data.access_token));
            history.push("/");
        });
    }

    return (
        <Container>
            <form onSubmit={handleSubmit}>
               <LogForm> Username: <input type="text" onChange={e => setUsername(e.target.value)} /></LogForm>
               <LogForm> Password: <input type="password" onChange={e => setPassword(e.target.value)} /> </LogForm>
                <LogForm><ButtonSet>Register</ButtonSet></LogForm>
               <LogForm> <Link to="/login">Click here to login instead</Link></LogForm>
            </form>
        </Container>
    )
}

export default Register;
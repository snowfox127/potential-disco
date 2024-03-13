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
padding:10px;
   
`

function Login(props) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const history = useHistory();

    async function loginUser() {
        const searchParams = new URLSearchParams();
        searchParams.append('username', username);
        searchParams.append('password', password);

        const response = await fetch('http://localhost:8000/token', {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: searchParams.toString()
        });
        const data = await response.json();

        return data;
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        loginUser().then(data => {
            props.setToken(data.access_token);
            localStorage.setItem('token', JSON.stringify(data.access_token));
            history.push("/");
        });
    }

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <LogForm>Username: <input type="text" onChange={e => setUsername(e.target.value)} /></LogForm> 
                <LogForm>Password: <input type="password" onChange={e => setPassword(e.target.value)} /></LogForm>
                <LogForm><ButtonSet>Login</ButtonSet></LogForm>
                <LogForm><Link to="/register">No account? Create one!</Link></LogForm>
            </form>
        </Container>
    )
}

export default Login;
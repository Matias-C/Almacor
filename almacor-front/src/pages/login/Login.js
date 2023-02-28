import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import ContextConnected from '../../context/ContextConnected';

import "./Login.css"

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {

    const Connected = useContext(ContextConnected);
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const [openAlert, setOpenAlert] = useState(false);
    
    const handleName = (e) => {
        setUserName(e.target.value);
    };

    const handlePassword = (e) => {
        setUserPassword(e.target.value);
    }

    const handleOpenAlert = () => {
        setOpenAlert(true);
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    const refreshPage = () => {
        window.location.reload(false);
    }

    const login = async (username, password) => {

        if(password !== "" && username !== "") {

            const response = await fetch("https://apicd.almacorweb.com/api/v1/auth/login/", {
                method: "POST",
                body: JSON.stringify({ username: username, password: password}),
                headers: {
                "Content-Type": "application/json",
                },
            })
    
            const res = await response.json();
            console.log(res.user)
        
            if (response.status === 200) {

                Connected.setUserInfo(res.user);
                const newToken = { access_token: res.access_token, refresh_token: res.refresh_token }
                localStorage.setItem("token", JSON.stringify(newToken));
                navigate("/depositos");
                refreshPage();

            } else {
                <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
                        Nombre de usuario o Contraseña incorrectos.
                    </Alert>
                </Snackbar>
            }   
        }
    }

    return(

        <div className='login-cont'>
            <Card variant='outlined' className='login-card'>
                <CardContent>
                    <Typography variant="h2">Iniciar Sesión</Typography>
                    <hr className='separator'/>

                    <Typography variant="h5" className='login-label'>Nombre de Usuario</Typography>
                    <FormControl variant="standard" fullWidth>
                        <Input
                            id="name"
                            autoFocus
                            value={userName}
                            onChange={handleName}
                        />
                        <FormHelperText>
                        </FormHelperText>
                    </FormControl>

                    <Typography variant="h5" className='login-label password'>Contraseña</Typography>
                    <FormControl variant="standard" fullWidth>
                        <Input
                            id="password"
                            type='password'
                            value={userPassword}
                            onChange={handlePassword}
                        />
                        <FormHelperText>
                        </FormHelperText>
                    </FormControl>
                </CardContent>

                <CardActions>
                    <Button 
                        variant="contained" 
                        className='login-button'
                        onClick={() => {
                                const username = userName;
                                const password = userPassword;

                                login(username, password);
                            }}
                    >
                        Iniciar Sesión
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default Login;
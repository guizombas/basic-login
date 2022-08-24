import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import LoadingButton from '@mui/lab/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useLoginController } from '../controllers/userControllers';
import { useAuth } from '../context/authContext';

const theme = createTheme();

export default function Login() {

  const { execute: loginAPI, value: responseAPI, error, loading } = useLoginController();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ validation, setValidation ] = useState({
    username: false,
    password: false
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username || !password){
      setValidation({
        username: !Boolean(username),
        password: !Boolean(password)
      })
    }
    else{
      loginAPI({
        username,
        password
      })
    }


  };

  useEffect(()=>{
    if (responseAPI){
      login(responseAPI.token);
    }
  }, [responseAPI])

  useEffect(()=>{
    if ((validation.username && username) || (validation.password && password) ){
      setValidation({
        username: !Boolean(username),
        password: !Boolean(password)
      });
    }
  }, [validation, username, password])

  return (
    <ThemeProvider theme={theme}>
      <div style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "linear-gradient(to left bottom, #020024, #103259, #156393, #089acb, #00d4ff)"
      }}>

        <Container component="main" maxWidth="xs">
          <Paper elevation={10} sx={{
            padding: 4,
          }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                L
              </Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                  fullWidth
                  id="username"
                  label="Usuário"
                  name="username"
                  autoComplete="username"
                  helperText={validation.username ? "Preencha o usuário!" : undefined}
                  error={validation.username}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  helperText={validation.password ? "Preencha a senha!" : undefined}
                  error={validation.password}
                  id="password"
                  autoComplete="current-password"
                />
                {
                  error && <div style={{
                    color: "red",
                    textAlign: "center"
                  }}>{error.message}</div>
                }
                <LoadingButton
                  loading={loading}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Fazer Login
                </LoadingButton>
              </Box>
            </Box>
          </Paper>
        </Container>
      </div>
    </ThemeProvider>
  );
}
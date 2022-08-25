import { Container, Paper } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from "react";

const theme = createTheme();

export function withTemplate<P extends object = {}>(Component: React.ComponentType<P>) {
    return function (props: P) {
        return (
            <ThemeProvider theme={theme} >
                <div style={{
                    width: "100%",
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundImage: "linear-gradient(to left bottom, #020024, #103259, #156393, #089acb, #00d4ff)"
                }}>

                    <Container component="main" maxWidth="xs">
                        <Component {...props} />
                    </Container>
                </div>
            </ThemeProvider>
        )
    }
}
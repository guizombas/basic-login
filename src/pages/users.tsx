import { Avatar, CircularProgress, Paper } from "@mui/material";
import { withAuth } from "../hocs/withAuth";
import { withTemplate } from "../hocs/withTemplate";

import SignoutImage from "../assets/images/signout.png"
import UserImage from "../assets/images/usericon.png"
import { useListUsersController } from "../controllers/userControllers";
import { useEffect } from "react";
import { useAuth } from "../context/authContext";

function Users() {

    const { execute: listUsersFromAPI, value: response, loading } = useListUsersController();
    const usersList = response ? [response] : [];
    const { logout } = useAuth();

    useEffect(() => {
        listUsersFromAPI();
    }, [listUsersFromAPI])

    return (

        <Paper elevation={10} sx={{
            padding: 1,
        }}>
            <div style={{
                display: "flex",
                justifyContent: "flex-end"
            }}>
                <img
                    src={SignoutImage}
                    alt="Sair"
                    width={30}
                    height={30}
                    style={{
                        cursor: 'pointer'
                    }}
                    onClick={logout}
                />
            </div>
            <div style={{
                padding: 20
            }}>
                {
                    loading ? (
                        <CircularProgress />
                    ) : (
                        usersList.length ? (
                            usersList.map(user => (
                                <div
                                    style={{
                                        display: "flex",
                                        gap: 12,
                                        alignItems: "center",
                                        marginBottom: 20,
                                    }}
                                    key={user.id}
                                >
                                    <img src={UserImage} alt="Ícone de Usuário" width={75} height={75} />
                                    <div>
                                        <strong>{user.username}</strong>
                                        <div>ID: {user.id}</div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>Nenhum usuário encontrado</div>
                        )
                    )
                }
            </div>

        </Paper>
    )
}

export default withAuth(
    withTemplate(
        Users
    ), true);
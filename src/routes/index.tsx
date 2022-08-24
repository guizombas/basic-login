import { BrowserRouter, Navigate, Route, Routes,  } from "react-router-dom";
import AuthRoute from "../components/authRoute";
import { useAuth } from "../context/authContext";
import Login from "../pages/login";
import Users from "../pages/users";

export default function Router(){
    const { redirectRoute } = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={<AuthRoute><Login/></AuthRoute>}
                />
                <Route
                    path="/"
                    element={<AuthRoute privateRoute><Users/></AuthRoute>}
                />
                <Route
                    path="*"
                    element={<Navigate to={redirectRoute}/>}
                />
            </Routes>
        </BrowserRouter>
    )
}
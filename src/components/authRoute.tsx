import React from "react";
import { Navigate, PathRouteProps, Route } from "react-router-dom";
import { useAuth } from "../context/authContext";

interface IAuthRouteProps {
    privateRoute?: boolean,
    children: JSX.Element
}

export default function AuthRoute({ privateRoute, children }: IAuthRouteProps){
    const { token, redirectRoute } = useAuth();
    
    if ((token && privateRoute) || (!token && !privateRoute)){
        return children;
    }
    else return <Navigate to={redirectRoute}/>;

}
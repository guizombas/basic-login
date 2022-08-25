import React from "react";
import AuthRoute from "../components/authRoute";

export function withAuth<P extends object = {}>(Component: React.ComponentType<P>, privateRoute?: boolean) {
    return function (props: P) {
        return (
            <AuthRoute privateRoute={privateRoute}>
                <Component {...props}/>
            </AuthRoute>
        )
    }
}
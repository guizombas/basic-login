import { useAuth } from "../context/authContext";
import useAsync from "../hooks/useAsync";
import { ILoginRequest, ILoginResponse, IUser } from "../interfaces/userInterfaces";
import { fetchAPI } from "../services/api";

export function useListUsersController() {
    const { token } = useAuth();

    return useAsync(async (loginData: ILoginRequest) => fetchAPI<IUser>("/users", {
        token
    }));
}

export function useLoginController() {
    return useAsync(async (loginData: ILoginRequest) => {
        const response = await fetchAPI<ILoginResponse>("/login", {
            method: "POST",
            body: JSON.stringify(loginData)
        });

        if (response.status === "ERROR"){
            throw new Error(response.message);
        }
        else {
            return response.data;
        }
    }
    );
}
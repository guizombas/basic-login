export interface IUser{
    username: string,
    password: string
}

export interface ILoginRequest{
    username: string,
    password: string
}

export interface ILoginResponse {
    status: 'ERROR' | 'SUCCESS',
    message: string,
    data: {
        token: string
    },
}
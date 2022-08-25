export interface IUser{
    id: number,
    username: string,
    password: string
}

export interface ILoginRequest extends Omit<IUser, "id"> {}

export interface ILoginResponse {
    status: 'ERROR' | 'SUCCESS',
    message: string,
    data: {
        token: string
    },
}
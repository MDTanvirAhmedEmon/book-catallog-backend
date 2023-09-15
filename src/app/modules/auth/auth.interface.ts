export type IUserLogin = {
    email: string;
    password: string;
};

export type IUserLoginResponse = {
    accessToken: string;
    refreshToken?: string;
}


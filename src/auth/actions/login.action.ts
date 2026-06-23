// import type { AuthResponse } from "../../interfaces/auth.response";


// TODO: Terminar código cuando tenga API
// Devuelve Promise<AuthResponse>
export const LoginAction = async (email: string, password: string) => {
    return ({email, password});
    try {
        const { data } = await {/*tesloApi.post<AuthResponse>('auth/login', {
            email,
            password,
        })*/}

        console.log(data);

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
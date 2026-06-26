import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../store/store";
import calendarApi from "../api/calendarApi";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";
import { onLogoutCalendar } from "../store/calendar/calendarSlice";

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch()

    const startLogin = async ({ email, password }: { email: string; password: string }) => {
        dispatch(onChecking());

        try {
            const { data } = await calendarApi.post('/auth', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());
            dispatch(onLogin({ name: data.name, uid: data.uid }));

        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const startRegister = async ({ name, email, password }: { name: string, email: string, password: string }) => {
        dispatch(onChecking());

        try {
            const { data } = await calendarApi.post('/auth/new', { name, email, password });
            if (data.email !== null) return;
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error: any) {
            dispatch(onLogout(error.response.data?.msg || '--'))
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if(!token) return dispatch( onLogout('El token expiró') );
    
        try {
            const { data } = await calendarApi.get('auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            localStorage.clear();
            dispatch( onLogout('El token expiró') );
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch( onLogoutCalendar() );
        dispatch( onLogout('') );
    }

    return {
        //* Properties
        status,
        user,
        errorMessage,


        //* Methods
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,
    }
}
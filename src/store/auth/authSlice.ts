import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthUser {
    uid: string;
    name: string;
}

interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated';
    user: AuthUser | null;
    errorMessage: string | undefined;
}

const initialState: AuthState = {
    status: 'checking',
    user: null,           // ✅ null en vez de {}
    errorMessage: undefined,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        onChecking: (state) => {
            state.status = 'checking';
            state.user = null;
            state.errorMessage = undefined;
        },
        onLogin: (state, { payload }: PayloadAction<AuthUser>) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = undefined;
        },
        onLogout: (state, { payload }: PayloadAction<string | undefined>) => {
            state.status = 'not-authenticated';
            state.user = null;
            state.errorMessage = payload;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined;
        }
    },
});

export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;
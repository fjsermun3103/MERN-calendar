import { Navigate, Route, Routes } from "react-router";
import { LoginPage } from "../auth/pages/LoginPage";
import { CalendarPage } from "../calendar/pages/CalendarPage";
import { useAuthStore } from "../hooks/useAuthStore";
import { useEffect } from "react";
// import { NotAuthenticatedRoutes } from "../components/routes/ProtectedRoutes";


// export const appRouter = createBrowserRouter([
//     {
//         path: '/auth',
//         element: 
//             <NotAuthenticatedRoutes>
//                 <AuthLayout />,    
//             </NotAuthenticatedRoutes>,
//         children: [
//             {
//                 index: true,
//                 element: <Navigate to="/auth/login" />,
//             },
//             {
//                 path: 'login',
//                 element: <LoginPage />,
//             }
//         ],
//     },
//     {
//         path: '/*',
//         element: <CalendarPage />
//     }
// ])

//! Provisional
export const AppRouter = () => {
    const { status, checkAuthToken } = useAuthStore();
    //const authStatus = 'not-authenticated';

    useEffect(() => {
        checkAuthToken();
    }, []);

    if (status === 'checking') {
        return (
            <h3>Cargando...</h3>
        );
    }

    return (
        <Routes>
            {
                ( status === 'not-authenticated' )
                    ? (
                        <>
                            <Route path="/auth/*" element={ <LoginPage />} />
                            <Route path="/*" element={ <Navigate to="/auth/login" /> } />
                        </>
                    )
                    : (
                        <>
                            <Route path="/" element={ <CalendarPage /> }/>
                            <Route path="/*" element={ <Navigate to="/" /> } />
                        </>
                    )
            }

        </Routes>
    )
}
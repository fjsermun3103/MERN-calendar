import { Navigate, Route, Routes } from "react-router";
import { LoginPage } from "../auth/pages/LoginPage";
import { CalendarPage } from "../calendar/pages/CalendarPage";
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
    const authStatus = 'authenticated';

    return (
        <Routes>
            {
                ( authStatus === 'not-authenticated' )
                    ? <Route path="/auth/*" element={ <LoginPage />} />
                    : <Route path="/*" element={ <CalendarPage /> }/>
            }

            <Route path="/*" element={ <Navigate to="/auth/login" /> } />
        </Routes>
    )
}
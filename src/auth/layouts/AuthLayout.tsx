import { Outlet } from "react-router";

export const AuthLayout = () => {
    return (
        <div>
            <div>
                <Outlet />
            </div>
        </div>
    )
};
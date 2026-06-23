import { BrowserRouter } from "react-router"
import { AppRouter } from "./router/app.router"

export const CalendarApp = () => {
    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    )
}
import type { MyEvent } from "../pages/CalendarPage";


export interface CalendarEvent {
    event : MyEvent
};

export const CalendarEvent = ({event}: CalendarEvent)=> {
    
    const { title, user } = event;


    return (
        <div className="text-wrap text-break">
            <strong>{title}</strong>
            <span>- {user.name}</span>
        </div>
    )
}

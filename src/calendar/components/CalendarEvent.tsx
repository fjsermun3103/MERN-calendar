import type { MyEvent } from "../../interfaces/event.interface";


export interface CalendarEventProps{
    event : MyEvent;
};

export const CalendarEvent = ({event}: CalendarEventProps)=> {
    
    const { title, user } = event;


    return (
        <div className="text-wrap text-break">
            <strong>{title}</strong>
            <span>- {user?.name}</span>
        </div>
    )
}

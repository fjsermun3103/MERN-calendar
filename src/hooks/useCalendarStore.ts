import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../store/store"
import { onSetActiveEvent } from "../store/calendar/calendarSlice";
import type { MyEvent } from "../interfaces/event.interface";


export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const {events, activeEvent} = useSelector((state:RootState) => state.calendar) 

    const parsedEvents: MyEvent[] = events.map(event => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
    }));

    const parsedActiveEvent: MyEvent | null = activeEvent
        ? { ...activeEvent, start: new Date(activeEvent.start), end: new Date(activeEvent.end) }
        : null;

    const setActiveEvent = (event: MyEvent) => {
        dispatch(onSetActiveEvent({
            ...event,
            start: event.start.toString(),
            end: event.end.toString(),
        }));
    }


    return {
        //* Properties
        events: parsedEvents,
        activeEvent: parsedActiveEvent,

        //* Methods
        setActiveEvent,


    }
}
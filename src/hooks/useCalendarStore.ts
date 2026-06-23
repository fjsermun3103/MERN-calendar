import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../store/store"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, type CalendarEventStore } from "../store/calendar/calendarSlice";
import type { MyEvent } from "../interfaces/event.interface";


export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const {events, activeEvent} = useSelector((state:RootState) => state.calendar) 

    const parsedEvents = events.map(event => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
    }));

    const parsedActiveEvent = activeEvent
        ? { ...activeEvent, start: new Date(activeEvent.start), end: new Date(activeEvent.end) }
        : null;

    const setActiveEvent = (event: MyEvent) => {
        dispatch(onSetActiveEvent({
            ...event,
            start: event.start,
            end: event.end,
        }));
    }

    const startSavingEvent = async ( calendarEvent: CalendarEventStore ) => {
        // TODO: llegar al backend

        // Todo bien

        if ( calendarEvent._id ) {
            // Actualizando
            dispatch(onUpdateEvent({ ...calendarEvent }));
        } else {
            // Creando
            dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }))

        }
    }

    const startDeletingEvent = () => {
        // TODO: Llegar al backend
        
        dispatch(onDeleteEvent());
    }


    return {
        //* Properties
        events: parsedEvents,
        activeEvent: parsedActiveEvent,
        hasEventSelected: !!activeEvent,

        //* Methods
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,

    }
}
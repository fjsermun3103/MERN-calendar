import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../store/store"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent, type CalendarEventStore } from "../store/calendar/calendarSlice";
import type { MyEvent } from "../interfaces/event.interface";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers/convertEventsToDateEvents";
import Swal from "sweetalert2";
import { useCallback, useMemo } from "react";


export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const {events, activeEvent} = useSelector((state:RootState) => state.calendar) 
    const {user} = useSelector((state:RootState) => state.auth);

    const parsedEvents = useMemo(() => 
        events.map(event => ({
            ...event,
            start: new Date(event.start),
            end: new Date(event.end),
        }))
    , [events]);  // solo recalcula cuando cambian los eventos del store

    const parsedActiveEvent = useMemo(() => 
        activeEvent
            ? { ...activeEvent, start: new Date(activeEvent.start), end: new Date(activeEvent.end) }
            : null
    , [activeEvent]);


    const setActiveEvent = (event: MyEvent) => {
        dispatch(onSetActiveEvent({
            ...event,
            start: event.start,
            end: event.end,
        }));
    };

    const startSavingEvent = async ( calendarEvent: CalendarEventStore ) => {
        if (!user) return;
        try {
            if ( calendarEvent.id ) {
                // Actualizando
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({ ...calendarEvent, user }));
                return;
            
            }
            // Creando
            const { data } = await calendarApi.post('/events', calendarEvent);
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user:user }))
        } catch(error) {
            console.log(error);
            const errorMessage = (error as any)?.response?.data?.msg || 'Error al guardar';
            Swal.fire('Error al guardar', errorMessage, 'error');
        }

        
    };

    const startDeletingEvent = async() => {
        try {
            await calendarApi.delete(`/events/${activeEvent?.id}`);
            dispatch(onDeleteEvent());
        } catch (error) {
            console.log(error)
            Swal.fire('Error al eliminar', (error as any).response.data.msg, 'error');
        }
    };

    const startLoadingEvents = useCallback(async () => {
        try {
            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDateEvents(data.eventos);
            dispatch(onLoadEvents(events));
        } catch (error) {
            console.log('Error cargando eventos');
            console.log(error);
        }
    }, [dispatch]);

    return {
        //* Properties
        events: parsedEvents,
        activeEvent: parsedActiveEvent,
        hasEventSelected: !!activeEvent,

        //* Methods
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents,

    }
}
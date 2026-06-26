import { Calendar, type EventPropGetter, type View } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { NavbarComponent } from "../components/NavbarComponent"
import { localizer } from '../../helpers/calendarLocalizer';
import { getMessagesES } from '../../helpers/getMessagesES';
import { useEffect, useState } from 'react';
import { CalendarEvent } from '../components/CalendarEvent';
import { CalendarModal } from '../components/CalendarModal';
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import type { MyEvent } from '../../interfaces/event.interface';
import { FabAddNew } from '../components/FabAddNew';
import { FabDelete } from '../components/FabDelete';
import { useAuthStore } from '../../hooks/useAuthStore';

export const CalendarPage = () => {

    const {user} = useAuthStore();
    const { openDateModal } = useUiStore();
    const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

    const [date, setDate] = useState(new Date());
    const [lastView, setLastView] = useState<View>(() => {
        const storedView = localStorage.getItem('lastView') as View | null;
        return storedView || 'week';
    });

    const eventStyleGetter: EventPropGetter<MyEvent> = (event) => {
    
        const isMyEvent = !!user && !!event.user && (
            user.uid === event.user._id || 
            user.uid === event.user._id
        );
        
        const style = {
            backgroundColor: isMyEvent ? '#347CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white',
        };

        return { style };
    }

    const onDoubleClick = () => {
        openDateModal();
    }

    const onSelect = (event: MyEvent) => {
        setActiveEvent(event);
    }

    const onViewChanged = (view: View) => {
        setLastView(view);
        localStorage.setItem('lastView', view);
    }

    useEffect(() => {
        startLoadingEvents();
    }, []);

    return (
        <>
            <NavbarComponent />
            <Calendar
                culture='es'
                localizer={localizer}
                events={events}
                view={lastView}
                date={date}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                messages={getMessagesES()}
                onNavigate={(d) => { setDate(d) }}
                onView={onViewChanged}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
            />
            <CalendarModal/>
            <FabAddNew/>
            <FabDelete />
        </>
    )
}
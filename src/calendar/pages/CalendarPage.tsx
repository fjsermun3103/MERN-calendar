import { Calendar, type EventPropGetter, type View } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { NavbarComponent } from "../components/NavbarComponent"
import { localizer } from '../../helpers/calendarLocalizer';
import { getMessagesES } from '../../helpers/getMessagesES';
import { useState } from 'react';
import { CalendarEvent } from '../components/CalendarEvent';
import { CalendarModal } from '../components/CalendarModal';
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import type { MyEvent } from '../../interfaces/event.interface';
import { FabAddNew } from '../components/FabAddNew';
import { FabDelete } from '../components/FabDelete';

export const CalendarPage = () => {

    const { openDateModal } = useUiStore();
    const { events, setActiveEvent } = useCalendarStore();

    const [date, setDate] = useState(new Date());
    const [lastView, setLastView] = useState<View>(() => {
        const storedView = localStorage.getItem('lastView') as View | null;
        return storedView || 'week';
    });

    const eventStyleGetter: EventPropGetter<MyEvent> = ({/*event, start, end, isSelected*/ }) => {

        const style = {
            backgroundColor: '#347CF7',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white',
        }
        return {
            style
        }
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
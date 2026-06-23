import { Calendar, type EventPropGetter, type View } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';


import { NavbarComponent } from "../components/NavbarComponent"
import { addHours } from 'date-fns';
import { localizer } from '../../helpers/calendarLocalizer';
import { getMessagesES } from '../../helpers/getMessagesES';
import { useState } from 'react';
import { CalendarEvent } from '../components/CalendarEvent';


export interface MyEvent {
    title: string;
    notes: string;
    start: Date;
    end: Date;
    bgcolor?: string;
    user: {
        _id: string;
        name: string;
    }

}

const events: MyEvent[] = [{
    title: 'Cumpleaños del jefe',
    notes: 'Hay que comprar tarta',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgcolor: '#fafafa',
    user: {
        _id: '123',
        name: 'Paco',
    }
}];



export const CalendarPage = () => {
    const [date, setDate] = useState(new Date());
    const [lastView, setLastView] = useState<View>(() => {
        const storedView = localStorage.getItem('lastView') as View | null;
        return storedView || 'week';
    });

    const eventStyleGetter: EventPropGetter<MyEvent> = (event, start, end, isSelected) => {

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


    const onDobleClick = (event: MyEvent) => {
        console.log({ doubleClick: event });
    }

    const onSelect = (event: MyEvent) => {
        console.log({ click: event });
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
                onDoubleClickEvent={onDobleClick}
                onSelectEvent={onSelect}
            />

        </>
    )
}
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

export interface CalendarEventStore {
    _id?: number | string;
    title: string;
    notes: string;
    start: Date;
    end: Date;
    bgcolor?: string;
    user?: {
        _id?: string;
        name?: string;
    }
}

interface CalendarState {
    events: CalendarEventStore[];
    activeEvent: CalendarEventStore | null; 
}

const now = new Date();

const tempEvent: CalendarEventStore = {
    _id: now.getTime(),
    title: 'Cumpleaños del jefe',
    notes: 'Hay que comprar tarta',
    start: now,
    end: addHours(now, 2),
    bgcolor: '#fafafa',
    user: {
        _id: '123',
        name: 'Paco',
    }
}

const initialState: CalendarState = {
    events: [tempEvent],
    activeEvent: null,
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        onSetActiveEvent: (state, { payload }: PayloadAction<CalendarEventStore>) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: ( state, { payload }: PayloadAction<CalendarEventStore> ) => {
            state.events.push( payload );
            state.activeEvent = null;

        },
        onUpdateEvent: ( state, {payload}: PayloadAction<CalendarEventStore> ) => {
            state.events = state.events.map( event => {
                if (event._id === payload._id) {
                    return payload;
                }

                return event;
            } );
        },
        onDeleteEvent: (state) => {
            if ( state.activeEvent ) {
                state.events = state.events.filter( event => event._id !== state.activeEvent?._id )
                state.activeEvent = null;
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

export interface CalendarEventStore {
    _id?: number | string;
    title: string;
    notes: string;
    start: string;
    end: string;
    bgcolor?: string;
    user: {
        _id: string;
        name: string;
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
    start: now.toISOString(),
    end: addHours(now, 2).toISOString(),
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
    },
})

// Action creators are generated for each case reducer function
export const { onSetActiveEvent } = calendarSlice.actions;
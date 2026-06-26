import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CalendarEventStore {
    id?: number | string;
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
    isLoadingEvents: boolean;
    events: CalendarEventStore[];
    activeEvent: CalendarEventStore | null;
}

const initialState: CalendarState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null,
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        onSetActiveEvent: (state, { payload }: PayloadAction<CalendarEventStore>) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, { payload }: PayloadAction<CalendarEventStore>) => {
            state.events.push(payload);
            state.activeEvent = null;

        },
        onUpdateEvent: (state, { payload }: PayloadAction<CalendarEventStore>) => {
            state.events = state.events.map(event => {
                if (event.id === payload.id) {
                    return payload;
                }

                return event;
            });
        },
        onDeleteEvent: (state) => {
            if (state.activeEvent) {
                state.events = state.events.filter(event => event.id !== state.activeEvent?.id)
                state.activeEvent = null;
            }
        },
        onLoadEvents: (state, { payload = [] }) => {
            state.isLoadingEvents = false;
            state.events = payload;
            payload.forEach((event: any) => {
                const exists = state.events.some(dbEvent => dbEvent.id === event.id);
                if (!exists) {
                    state.events.push(event);
                };

            });
        },

        onLogoutCalendar: (state) => {
            state.isLoadingEvents = true;
            state.events = [];
            state.activeEvent = null;
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    onSetActiveEvent,
    onAddNewEvent,
    onUpdateEvent,
    onDeleteEvent,
    onLoadEvents,
    onLogoutCalendar,
} = calendarSlice.actions;
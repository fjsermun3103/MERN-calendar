import { type Event } from 'react-big-calendar';

export interface MyEvent extends Event {
    id?: string | number;
    title: string;
    start: Date;
    end: Date;
    notes: string;
    bgcolor?: string;
    user?: {
        _id?: string;
        name?: string;
    };
}
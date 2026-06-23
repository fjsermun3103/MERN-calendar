export interface MyEvent {
    _id?: number | string;
    title: string;
    notes: string;
    start: Date;
    end: Date;
    bgcolor?: string;
    user?: {
        _id?: string;
        name?: string;
    } | undefined;

}
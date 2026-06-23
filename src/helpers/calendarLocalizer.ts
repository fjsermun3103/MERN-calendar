import { format, getDay, parse, startOfWeek } from 'date-fns';
import { dateFnsLocalizer } from 'react-big-calendar';

import { es } from 'date-fns/locale'

const locales = {
    es,
}
export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

export const calendarLocalizer = () => {

}
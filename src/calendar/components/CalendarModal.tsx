import { addHours, differenceInSeconds } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import ReactModal from "react-modal";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";

registerLocale('es', es);

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

ReactModal.setAppElement('#root');

export const CalendarModal = () => {

    const { activeEvent } = useCalendarStore();
    const { isDateModalOpen, closeDateModal } = useUiStore();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2),
    });

    const titleClass = useMemo(() => {
        if (!formSubmitted) return '';

        return (formValues.title.length > 0)
            ? 'is-valid'
            : 'is-invalid'

    }, [formValues.title, formSubmitted])

    useEffect(() => {
        if (activeEvent !== null) {
            setFormValues({ ...activeEvent });
        }

    }, [activeEvent])

    const onInputChanged = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement
        >) => {
        const { target } = event

        setFormValues({
            ...formValues,
            [target.name]: target.value,
        })
    }

    const onDateChanged = (
        date: Date | null,
        changing: "start" | "end"
    ) => {
        if (!date) return;

        setFormValues({
            ...formValues,
            [changing]: date,
        })
    }

    const onCloseModal = () => {
        closeDateModal();
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormSubmitted(true);

        const difference = differenceInSeconds(formValues.end, formValues.start);

        if (isNaN(difference) || difference <= 0) {
            Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error')
            return;
        }

        if (formValues.title.length <= 0) {
            console.log('El título es requerido.')
            return;
        }

        console.log(formValues);

    }

    return (
        <ReactModal
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
        >

            <h1> Nuevo evento </h1>
            <hr />
            <form
                className="container"
                onSubmit={onSubmit}
            >

                <div className="flex flex-column mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        selected={formValues.start}
                        onChange={(event: Date | null) => onDateChanged(event, 'start')}
                        className="form-control"
                        dateFormat="Pp"
                        showTimeSelect
                        locale='es'
                        timeCaption="Hora"
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        minDate={formValues.start}
                        selected={formValues.end}
                        onChange={(event: Date | null) => onDateChanged(event, 'end')}
                        className="form-control"
                        dateFormat="Pp"
                        showTimeSelect
                        locale='es'
                        timeCaption="Hora"
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        onChange={onInputChanged}
                        value={formValues.title}
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"

                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        onChange={onInputChanged}
                        value={formValues.notes}
                        className="form-control"
                        placeholder="Notas"
                        rows={5}
                        name="notes"
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </ReactModal>
    )
}
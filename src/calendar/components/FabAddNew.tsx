import { addHours } from "date-fns";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useUiStore } from "../../hooks/useUiStore"

export const FabAddNew = () => {
    
    const { openDateModal } = useUiStore();
    const {setActiveEvent} = useCalendarStore();
    
    
    
    return (
        <button
            className="btn btn-primary fab"
            onClick={() => {
                setActiveEvent({
                    title: '',
                    notes: '',
                    start: new Date(),
                    end: addHours(new Date(), 2),
                    bgcolor: '#fafafa',
                    user: {
                        _id: '123',
                        name: 'Paco',
                    }
                })
                openDateModal();
            }}
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
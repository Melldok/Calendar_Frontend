
import { addHours, differenceInSeconds } from 'date-fns';
import { useState } from 'react';

import Modal from 'react-modal';
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import es from 'date-fns/locale/es';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
import { useMemo } from 'react';

import { useCalendarStore, useUiStore } from '../../hooks';
import { useEffect } from 'react';


registerLocale('es', es)


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

  Modal.setAppElement('#root');

export const CalendarModal = () => {


    const {isDateModalOpen, closeDateModal} = useUiStore();
    const {activeEvent, startSavingEvent, hasEventSelected, startDeletingEvent} = useCalendarStore()
    
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [formValues, setFormValues] = useState({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours(new Date(), 3),
    })


    const titleClass = useMemo(() => {
      
      if(!formSubmitted) return '';

      return (formValues.title.length > 0) ? '' : 'is-invalid' 


    }, [formValues.title, formSubmitted])


    useEffect(() => {
      if(activeEvent !== null){
        setFormValues({...activeEvent})
      }
  
    }, [activeEvent])
    

    const onInputChange = ({target}) => {
      setFormValues({
        ...formValues,
        [target.name] : target.value
      })
    }

    const onDateChange = (event,changing) => {
      setFormValues({
        ...formValues,
        [changing]: event
        
      })
    }


    const onCloseModal = () => {
        closeDateModal()
    }

    const onSubmit = async(event) => {
        event.preventDefault()
        setFormSubmitted(true);


        
        const difference = differenceInSeconds( formValues.end, formValues.start )
        
        // VALIDATIONS

        if(isNaN(difference) || difference <= 0){
          console.log('Error en fechas');
          Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error')
          return
        }

        if(formValues.title.length <= 0) return;

        console.log(formValues)
        await startSavingEvent( formValues );
        closeDateModal();
        setFormSubmitted(false)
  

      

    
    }


    const handleDelete = () => {
      startDeletingEvent();
  }

  return (
    <Modal
        isOpen={isDateModalOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
    >

      <h1> Nuevo evento </h1>
      <hr />

      <form className="container" onSubmit={onSubmit} >

        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            minDate={formValues.start}
            selected={formValues.start}
            onChange={(event) => onDateChange(event, 'start')}
            className="form-control"
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption='Hora'
           />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            selected={formValues.end}
            onChange={(event) => onDateChange(event, 'end')}
            className="form-control"
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption='Hora'
           />
        </div>

        <hr />
          <div className="form-group mb-2">
          <label>Titulo y notas</label>
        <input 
          type="text" 
          className={`form-control ${titleClass}`}
          placeholder="Título del evento"
          name="title"
          autoComplete="off"
          value={formValues.title}
          onChange={onInputChange}
        />
          <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>

        <div className="form-group mb-2">
          <textarea 
          type="text" 
          className="form-control"
          placeholder="Notas"
          rows="5"
          name="notes"
          onChange={onInputChange}
          value={formValues.notes}

          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
          style={{
            display: hasEventSelected ? '' : 'none'
          }}
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
        <button 
          className="btn btn-outline-primary btn-block"
          onClick={handleDelete}
          >
        <i className="fa-sharp fa-solid fa-trash"></i>
        <span> Borrar</span>
        </button>

      </form>

      </Modal>
  )
}

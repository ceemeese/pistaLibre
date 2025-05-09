
import { createI18n } from 'vue-i18n'


type MessageSchema = typeof messages['es']

const messages = {
    es: {
        hello: 'hola mundo',
        user: 'Usuario | Usuarios',
        court: 'Pista | Pistas',
        reservation: 'Reserva | Reservas',
        subtitle: 'Reserva tus pistas de forma rápida y sencilla',
        book: 'Reserva',
        name: 'Nombre',
        indoor: 'Indoor',
        isIndoor: '¿Es {indoor}?', 
        si: 'Sí',
        no: 'No',
        isPanoramic: '¿Es panorámica?',
        confirm: 'Confirmar',
        clean: 'Limpiar',
        askData: 'Selecciona una fecha',
        actions: 'Acciones',
        date: 'Fecha',
        startTime: 'Inicio',
        endTime: 'Fin',
        active: 'Activa',
        surname: 'Apellido',
        email: 'Email',
        id: 'ID', 
        back: 'Atrás',
        messageReservation: 'No tienes reservas'
    }
    ,
    en: {
        hello: 'hello world',
        user: 'User | Users',
        court: 'Court | Courts',
        reservation: 'Reservation | Reservations ',
        subtitle: '{book} your courts quickly and easily',
        book: 'Book',
        name: 'Name',
        indoor: 'Indoor',
        isIndoor: '¿Is it {indoor}?', 
        si: 'Yes',
        no: 'No',
        isPanoramic: '¿Is it panoramic?',
        confirm: 'Confirm',
        clean: 'Clean',
        askData: 'Select a date',
        actions: 'Actions',
        date: 'Date',
        startTime: 'Start',
        endTime: 'End',
        active: 'Active',
        surname: 'Surname',
        email: 'Email',
        id: 'ID',
        back: 'Back',
        messageReservation: "You don't have any reservations"
    },
        it: {
        hello: 'hello world',
        user: 'Utente | Utenti',
        court: 'Campo | Campi',
        reservation: 'Prenotazione | Prenotazioni',
        subtitle: '{book} i tuoi campi in modo rapido e semplice',
        book: 'Prenota',
        name: 'Nome',
        indoor: 'Indoor',
        isIndoor: '¿È {indoor}?', 
        si: 'Sì',
        no: 'No',
        isPanoramic: 'È panoramica?',
        confirm: 'Confermar',
        clean: 'Pulisci',
        askData: 'Seleziona una data',
        actions: 'Azioni',
        date: 'Data',
        startTime: 'Inizio',
        endTime: 'Fine',
        active: 'Attiva',
        surname: 'Cognome',
        email: 'Email',
        id: 'ID',
        back: 'Indietro',
        messageReservation: "Non hai prenotazioni"
    },

}

const i18n = createI18n<[MessageSchema], 'es' | 'en' | 'it' >({
    legacy: false,
    locale: 'es',
    fallbackLocale: 'en',
    messages
  })



export default i18n
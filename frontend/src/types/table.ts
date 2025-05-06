export interface Header {
    text: string
    value: string
}

export interface Item {
    id: number
    [key: string]: any
}


export const reservationHeader: Header[] = [
    { text: 'ID', value: 'id' },
    { text: 'Pista', value: 'court' },
    { text: 'Usuario', value: 'user' },
    { text: 'Fecha', value: 'date' },
    { text: 'Hora inicio', value: 'startTime' },
    { text: 'Hora fin', value: 'endTime' },
]


export const courtHeader : Array<Header> =[
    { text: 'ID', value: 'id' },
    { text: 'Nombre', value: 'name' },
    { text: 'Indoor', value: 'indoor' },
    { text: 'Activa', value: 'active' },
]


export const userHeader : Array<Header> = [
    { text: 'Nombre', value: 'name' },
    { text: 'Apellido', value: 'surname' },
    { text: 'Email', value: 'email' },
]
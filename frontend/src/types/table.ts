export interface Header {
    text: string
    value: string
}

export interface Item {
    id: number
    [key: string]: any
}


export const reservationHeaderAdmin: Header[] = [
    { text: 'id', value: 'id' },
    { text: 'court', value: 'court' },
    { text: 'user', value: 'user' },
    { text: 'date', value: 'date' },
    { text: 'startTime', value: 'startTime' },
    { text: 'endTime', value: 'endTime' },
]


export const reservationHeaderUser: Header[] = [
    { text: 'court', value: 'court' },
    { text: 'date', value: 'date' },
    { text: 'startTime', value: 'startTime' },
    { text: 'endTime', value: 'endTime' },
]


export const courtHeader : Array<Header> =[
    { text: 'id', value: 'id' },
    { text: 'name', value: 'name' },
    { text: 'indoor', value: 'indoor' },
    { text: 'active', value: 'active' },
]


export const userHeader : Array<Header> = [
    { text: 'name', value: 'name' },
    { text: 'surname', value: 'surname' },
    { text: 'email', value: 'email' },
]
export interface NewCourt {
    name: string,
    indoor: boolean, 
}


export interface Court extends NewCourt {
    id: number
    active: boolean
}




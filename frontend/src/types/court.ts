export interface NewCourt {
    name: string,
    indoor: boolean, 
    panoramic: boolean,
}


export interface Court extends NewCourt {
    id: number
    active: boolean
}

export interface CourtResult {
    success: boolean;
    message: string;
}




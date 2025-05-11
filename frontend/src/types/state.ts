    //Estado del formulario
    export interface State {
        name: string;
        surname: string;
        email: string;
        password: string;
    }

    export const initialState: State = {
        name: '',
        surname: '',
        email: '',
        password: ''
    }


    export interface StateCourt {
        name: string,
        indoor: boolean,
        panoramic: boolean,
    }

    export const initialCourtState: StateCourt = {
        name: '',
        indoor: false,
        panoramic: false,
    }
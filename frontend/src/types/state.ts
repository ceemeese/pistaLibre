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
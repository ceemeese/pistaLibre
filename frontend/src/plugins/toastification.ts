import Toast, { POSITION, TYPE } from 'vue-toastification'
import type { PluginOptions } from 'vue-toastification'
import 'vue-toastification/dist/index.css';

export const options: PluginOptions = {
    toastDefaults: {
        // ToastOptions object for each type of toast
        [TYPE.ERROR]: {
            timeout: 10000,
            closeButton: false,
        },
        [TYPE.SUCCESS]: {
            timeout: 3000,
            hideProgressBar: true,
        }    
    }
};

export default Toast

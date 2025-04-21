
import { createI18n } from 'vue-i18n'

const messages = {
    es: {
        hello: 'hola mundo'
    }
    ,
    ja: {
        hello: 'こんにちは、世界'
    },
    en: {
        hello: 'hello world'
    },

}

const i18n = createI18n({
    locale: 'es',
    messages
  })



export default i18n
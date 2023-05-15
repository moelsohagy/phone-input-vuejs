import PhoneInputVuejs from './components/PhoneInputVuejs.vue'

export default {
  install: (app, options) => {
    app.component('PhoneInputVuejs', PhoneInputVuejs)
  }
}
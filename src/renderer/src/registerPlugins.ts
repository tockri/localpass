// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import { App } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

const vuetify = createVuetify({
  components,
  directives
})

export const registerPlugins = (app: App<Element>): void => {
  app.use(vuetify)
}

// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import { App } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          outline: '#49454F',
          outlineVariant: '#CAC4D0'
        }
      },
      dark: {
        colors: {
          outline: '#CAC4D0',
          outlineVariant: '#49454F'
        }
      }
    }
  }
})

export const registerPlugins = (app: App<Element>): void => {
  app.use(vuetify)
}

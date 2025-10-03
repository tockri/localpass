import { Preview, setup } from '@storybook/vue3-vite'
import { registerPlugins } from '../src/renderer/src/registerPlugins'
import '../src/renderer/src/styles/tailwind.css'
import { withVuetifyTheme } from './withVeutifyTheme.decorator'

setup((app) => {
  registerPlugins(app)
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export const decorators = [withVuetifyTheme]

export default preview

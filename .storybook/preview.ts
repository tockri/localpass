import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import { registerPlugins } from '../src/renderer/src/registerPlugins'
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

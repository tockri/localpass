import { Decorator } from '@storybook/vue3-vite'
import { h } from 'vue'
import StoryWrapper from './StoryWrapper.vue'

export const withVuetifyTheme: Decorator = (storyFn, context) => {
  const story = storyFn()

  return () =>
    h(
      StoryWrapper,
      {}, // Props for StoryWrapper
      {
        // Puts your story into StoryWrapper's "story" slot with your story args
        story: () => h(story, { ...context.args })
      }
    )
}

import { createApp } from 'vue'
import App from './App.vue'
import { registerPlugins } from './registerPlugins'

const app = createApp(App)
registerPlugins(app)
app.mount('#app')

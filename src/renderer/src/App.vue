<script setup lang="ts">
import Versions from './components/Versions.vue'
import { BackendClientFactory } from './ipc/BackendClient'

const ipcHandle = async () => {
  const backend = BackendClientFactory.create()
  const isSigned = await backend.Session.isSigned()
  console.log('isSigned', isSigned)
}
</script>

<template>
  <div class="creator">Powered by electron-vite</div>
  <div class="text">
    Build an Electron app with
    <span class="vue">Vue</span>
    and
    <span class="ts">TypeScript</span>
    <v-text-field label="Label"></v-text-field>
  </div>
  <p class="tip">Please try pressing <code>F12</code> to open the devTool</p>
  <div class="actions">
    <div class="action">
      <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">Documentation</a>
    </div>
    <div class="action">
      <a target="_blank" rel="noreferrer" @click="ipcHandle">Send IPC</a>
    </div>
  </div>
  <Versions />
</template>

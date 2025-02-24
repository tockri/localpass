<template>
  <v-app>
    <v-main>
      <slot name="story"></slot>
      <toast />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Toast from '@renderer/components/Toast.vue'
import { overrideBackend } from '@renderer/ipc/BackendClient'
import { createMockBackend } from '@renderer/testlib'
overrideBackend(createMockBackend())
</script>

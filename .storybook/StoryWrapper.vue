<template>
  <v-app>
    <v-main>
      <slot name="story"></slot>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { overrideBackend } from '@renderer/ipc/BackendClient'
import { createMockBackend } from '@renderer/testlib'
overrideBackend(createMockBackend())
</script>

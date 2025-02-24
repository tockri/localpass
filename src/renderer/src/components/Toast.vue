<script setup lang="ts">
import { useToast } from './useToast'

const { showToast, toastMessage, ...tm } = useToast()
</script>

<template>
  <v-snackbar v-model="showToast" timeout="1000">
    {{ toastMessage }}
    <template #actions>
      <v-btn variant="text" @click="tm.hide">
        <v-icon icon="mdi:mdi-close-circle" />
      </v-btn>
    </template>
  </v-snackbar>
</template>

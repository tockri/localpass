<script setup lang="ts">
import { PassEntry } from '@common/interface'
import { defineProps } from 'vue'

const props = defineProps<{ entry: PassEntry }>()
</script>

<template>
  <v-card>
    <v-card-title>{{ entry.label }}</v-card-title>
    <v-card-item v-for="(attr, idx) in entry.attributes" :key="attr.label + idx">
      <v-card-text>{{ attr.label }}: {{ attr.value }}</v-card-text>
    </v-card-item>
  </v-card>
</template>

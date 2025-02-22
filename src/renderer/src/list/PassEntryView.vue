<script setup lang="ts">
import { PassEntry } from '@common/interface'
import { defineProps } from 'vue'
import EditableField from './EditableField.vue'

defineProps<{ entry: PassEntry }>()
</script>

<template>
  <v-container class="border-thin rounded">
    <v-row>
      <v-col class="pa-1 pl-2 bg-grey-lighten-3">
        <strong>{{ entry.label }}</strong>
      </v-col>
    </v-row>
    <v-row v-for="(attr, idx) in entry.attributes" :key="attr.label + idx">
      <v-col cols="4"><EditableField :model-value="attr.label" /></v-col>
      <v-col>{{ attr.value }}</v-col>
    </v-row>
  </v-container>
</template>

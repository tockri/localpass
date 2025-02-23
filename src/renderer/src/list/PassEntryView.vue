<script setup lang="ts">
import { PassEntry } from '@common/interface'
import EditableField from '@renderer/components/EditableField.vue'
import { defineProps } from 'vue'

const props = defineProps<{
  entry: PassEntry
  onUpdated?: (entry: Partial<PassEntry>) => void
}>()

function updateAttribute(idx: number, label: string): void {
  const newAttributes = [...props.entry.attributes]
  newAttributes[idx] = { ...newAttributes[idx], label }
  props.onUpdated?.({ attributes: newAttributes })
}

const updateValue = (idx: number, value: string): void => {
  const newAttributes = [...props.entry.attributes]
  newAttributes[idx] = { ...newAttributes[idx], value }
  props.onUpdated?.({ attributes: newAttributes })
}
</script>

<template>
  <v-container class="border-thin rounded">
    <v-row>
      <v-col class="pa-1 pl-2 bg-grey-lighten-3">
        <strong>{{ entry.label }}</strong>
      </v-col>
    </v-row>
    <v-row v-for="(attr, idx) in entry.attributes" :key="attr.label + idx">
      <v-col cols="4">
        <EditableField :value="attr.label" @change="(newValue) => updateAttribute(idx, newValue)" />
      </v-col>
      <v-col>
        <EditableField
          :value="attr.value"
          :type="attr.type === 'password' ? 'password' : 'text'"
          copiable
          @change="(newValue) => updateValue(idx, newValue)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

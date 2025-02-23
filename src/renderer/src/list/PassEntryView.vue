<script setup lang="ts">
import { PassEntry, PassEntryAttribute } from '@common/interface'
import EditableField from '@renderer/components/EditableField.vue'
import { defineProps } from 'vue'

const props = defineProps<{
  entry: PassEntry
}>()

const emit = defineEmits<{
  (e: 'updated', entry: Partial<PassEntry>): void
}>()

const updateAttribute = (idx: number, updated: Partial<PassEntryAttribute>): void => {
  const newAttributes = [...props.entry.attributes]
  newAttributes[idx] = { ...newAttributes[idx], ...updated }
  console.log(newAttributes, updated)
  emit('updated', { attributes: newAttributes })
}
</script>

<template>
  <v-card variant="flat" class="border-thin rounded">
    <v-card-title class="pa-1 pl-2 text-h6 bg-grey-lighten-3">{{ entry.label }}</v-card-title>

    <div class="table w-100">
      <div v-for="(attr, idx) in entry.attributes" :key="idx" class="table-row">
        <div class="table-cell w-33">
          <editable-field
            :value="attr.label"
            wrap-display
            class="flex-grow-1"
            @changed="(label) => updateAttribute(idx, { label })"
          />
        </div>
        <div class="table-cell w-66">
          <editable-field
            :value="attr.value"
            :type="attr.type === 'password' ? 'password' : 'text'"
            copiable
            class="flex-grow-1"
            @changed="(value) => updateAttribute(idx, { value })"
          />
        </div>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
.table {
  display: table;
}
.table-row {
  display: table-row;
}
.table-cell {
  display: table-cell;
  padding: 2px 4px;
  vertical-align: middle;
}
</style>

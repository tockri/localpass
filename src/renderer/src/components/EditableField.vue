<script setup lang="ts">
import { nextTick, ref } from 'vue'

const props = defineProps<{
  value: string
  type?: 'text' | 'password'
  copiable?: boolean
}>()

const emit = defineEmits<{
  (e: 'change', value: string): void
}>()

const editing = ref(false)
const editingValue = ref('')
const displayValue = props.type === 'password' ? '••••••••' : props.value

const startEdit = async (): Promise<void> => {
  editingValue.value = props.value
  editing.value = true
  await nextTick()
}

const endEdit = async (): Promise<void> => {
  emit('change', editingValue.value)
  editing.value = false
  await nextTick()
}

const cancelEdit = async (): Promise<void> => {
  editing.value = false
  await nextTick()
}
</script>

<template>
  <div>
    <template v-if="!editing">
      <div class="d-flex ga-1 align-center">
        <div class="flex-grow-1 editable-field" @click="startEdit">{{ displayValue }}</div>
        <v-icon v-if="type === 'password'" icon="mdi:mdi-eye" size="small" />
        <v-icon v-if="copiable === true" icon="mdi:mdi-content-copy" size="small" />
      </div>
    </template>
    <v-text-field
      v-else
      v-model="editingValue"
      :append-icon="type === 'password' ? 'mdi:mdi-eye' : ''"
      variant="underlined"
      density="compact"
      hide-details
      autofocus
      single-line
      :type="props.type || 'text'"
      class="pa-0"
      @keyup.enter="endEdit"
      @keyup.esc="cancelEdit"
      @blur="cancelEdit"
    />
  </div>
</template>

<style scoped>
.editable-field {
  padding: 2px 4px;
  border: 1px solid transparent;
  border-radius: 4px;
}
.editable-field:hover {
  border-color: rgba(0, 0, 0, 0.12);
}
</style>

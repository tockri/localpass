<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const editing = ref(false)
const tempValue = ref('')

function startEdit(): void {
  tempValue.value = props.modelValue
  editing.value = true
}

function endEdit(): void {
  emit('update:modelValue', tempValue.value)
  editing.value = false
}
</script>

<template>
  <div>
    <template v-if="!editing">
      <span @click="startEdit">{{ modelValue }}</span>
    </template>
    <v-text-field
      v-else
      v-model="tempValue"
      variant="outlined"
      density="compact"
      hide-details
      @keyup.enter="endEdit"
      @blur="endEdit"
    />
  </div>
</template>

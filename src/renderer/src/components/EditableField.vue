<script setup lang="ts">
import { computed } from 'vue'
import { useEditModel } from './EditableFieldLogic'

const props = defineProps<{
  value: string
  type?: 'text' | 'password'
  copiable?: boolean
  wrapDisplay?: boolean
}>()

const emit = defineEmits<{
  (e: 'changed', value: string): void
  (e: 'copied', value: string): void
}>()

const { editing, editingValue, showing, displayValue, ...em } = useEditModel({
  value: props.value,
  type: props.type,
  onSubmit: (value) => emit('changed', value),
  onCopied: props.copiable && ((value): void => emit('copied', value))
})

const showIcon = computed(() =>
  props.type === 'password' ? (!showing.value ? 'mdi:mdi-eye' : 'mdi:mdi-eye-off') : null
)
</script>

<template>
  <template v-if="!editing">
    <div class="d-flex ga-1 pa-2 align-center editable-field">
      <div v-if="wrapDisplay" class="flex-grow-1 wrap-display" @click="em.copy">
        {{ displayValue }}
      </div>
      <input v-else readonly :value="displayValue" class="w-100 nowrap-display" />

      <template v-if="showIcon">
        <v-icon :icon="showIcon" size="small" @click="em.toggle" />
      </template>
      <v-icon icon="mdi:mdi-pencil" size="small" class="edit-button" @click="em.start" />
    </div>
  </template>
  <template v-else>
    <div class="d-flex ga-1 pa-0 align-center editable-field">
      <v-text-field
        v-model="editingValue"
        variant="outlined"
        density="compact"
        hide-details
        autofocus
        single-line
        :type="showing ? 'text' : props.type || 'text'"
        class="pa-0"
        @keyup.enter="em.submit"
        @keyup.esc="em.cancel"
        @blur="em.cancel"
      />
      <template v-if="showIcon">
        <v-icon :icon="showIcon" size="small" @mousedown.prevent="em.toggle" />
      </template>
    </div>
  </template>
</template>

<style scoped>
.editable-field {
  padding: 2px 4px;
  border: 1px solid transparent;
  border-radius: 4px;
  .wrap-display {
    word-break: break-all;
  }
  .nowrap-display {
    outline: none;
  }
  .edit-button {
    visibility: hidden;
  }
}
.editable-field:hover {
  border-color: rgba(0, 0, 0, 0.12);
  .edit-button {
    visibility: visible;
  }
}
</style>

<script setup lang="ts">
import { computed } from 'vue'
import { useEditableFieldModel } from './useEditableFieldModel'

const props = defineProps<{
  value: string
  type?: 'text' | 'password'
  copyMessage?: string
  wrapDisplay?: boolean
}>()

const emit = defineEmits<{
  (e: 'changed', value: string): Promise<void>
}>()

const { editing, editingValue, showing, displayValue, ...em } = useEditableFieldModel({
  value: props.value,
  type: props.type,
  copyMessage: props.copyMessage,
  onSubmit: (value) => emit('changed', value)
})

const showIcon = computed(() =>
  props.type === 'password' ? (!showing.value ? 'mdi:mdi-eye' : 'mdi:mdi-eye-off') : null
)

const click = (): void => {
  if (displayValue.value.trim() === '') {
    em.start()
  } else {
    em.copy()
  }
}
</script>

<template>
  <template v-if="!editing">
    <div class="d-flex ga-1 pa-2 align-center editable-field">
      <div v-if="wrapDisplay" readonly class="flex-grow-1 wrap-display" @click="click">
        <template v-if="displayValue">{{ displayValue }}</template>
        <template v-else>&nbsp;</template>
      </div>
      <input
        v-else
        readonly
        :value="displayValue"
        class="w-100 nowrap-display cursor-default"
        @click="click"
      />

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
        @keydown.enter="em.submit"
        @keydown.esc="em.cancel"
        @blur="em.cancel"
      />
      <template v-if="showIcon">
        <v-icon :icon="showIcon" size="small" @mousedown.prevent.stop="em.toggle" />
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

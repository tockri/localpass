<template>
  <div class="d-flex ga-2 align-start">
    <editable-field v-model="labelModel" class="flex-grow-1" />
    <editable-field
      v-model="valueModel"
      :type="attribute.type === 'password' ? 'password' : 'text'"
      :copy-message="copyMessage"
      class="attr-value"
    />
    <v-btn icon size="x-small" variant="text" @click="emits('remove')">
      <v-icon icon="mdi:mdi-close" />
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { PassEntryAttribute } from '@common/interface'
import EditableField from '@renderer/components/EditableField.vue'
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  entryLabel: string
  attribute: PassEntryAttribute
}>()

const emits = defineEmits<{
  (e: 'update', value: PassEntryAttribute): void
  (e: 'remove'): void
}>()

const { attribute } = props

const labelModel = ref(attribute.label)
const valueModel = ref(attribute.value)

const update = (): void => {
  emits('update', {
    type: attribute.type,
    label: labelModel.value,
    value: valueModel.value
  })
}

watch(labelModel, update)
watch(valueModel, update)

const copyMessage = computed(() => `${props.entryLabel}の${labelModel.value}をコピーしました`)
</script>

<style scoped>
.attr-value {
  flex: 2 1 0;
}
</style>

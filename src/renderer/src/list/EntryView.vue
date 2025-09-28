<template>
  <v-expansion-panel class="entry-panel">
    <v-expansion-panel-title expand-icon="mdi:mdi-menu-down">
      <div class="d-flex align-center w-100">
        <span class="text-body-1 text-high-emphasis">{{ displayLabel }}</span>
        <v-spacer />
        <v-btn icon size="x-small" variant="text" @click.stop="emit('remove', entry.id)">
          <v-icon icon="mdi:mdi-delete" />
        </v-btn>
      </div>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <div class="d-flex flex-column ga-4">
        <div class="d-flex align-center ga-2">
          <span class="text-caption text-medium-emphasis">Label</span>
          <editable-field v-model="labelModel" class="flex-grow-1" />
        </div>

        <v-divider />

        <div class="d-flex align-center justify-space-between">
          <span class="text-subtitle-2 text-medium-emphasis">Attributes</span>
          <div class="d-flex ga-2">
            <v-btn size="small" variant="text" @click="addTextAttribute">
              <v-icon icon="mdi:mdi-plus" start />Add text
            </v-btn>
            <v-btn size="small" variant="text" @click="addPasswordAttribute">
              <v-icon icon="mdi:mdi-plus" start />Add password
            </v-btn>
          </div>
        </div>

        <div class="d-flex flex-column ga-3">
          <attribute-view
            v-for="(attr, idx) in entry.attributes"
            :key="idx"
            :attribute="attr"
            :index="idx"
            :entry-label="labelModel"
            @remove="removeAttribute(idx)"
            @update="(newAttr) => updateAttribute(idx, newAttr)"
          />
        </div>
      </div>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import { PassEntry, PassEntryAttribute } from '@common/interface'
import EditableField from '@renderer/components/EditableField.vue'
import { computed, defineProps, nextTick, ref, watch } from 'vue'
import AttributeView from './AttributeView.vue'

const props = defineProps<{
  entry: PassEntry
}>()

const emit = defineEmits<{
  (e: 'updated', id: string, input: Partial<PassEntry>): void
  (e: 'remove', id: string): void
}>()

const entry = props.entry

const displayLabel = computed(() => entry.label || 'Untitled entry')

const update = (updated: Partial<PassEntry>): void => {
  emit('updated', entry.id, updated)
}

const updateAttribute = (idx: number, updated: Partial<PassEntryAttribute>): Promise<void> => {
  const newAttributes = entry.attributes.map((attr, index) => {
    if (index !== idx) {
      return attr
    }
    return {
      ...attr,
      ...updated
    } as PassEntryAttribute
  })
  update({ attributes: newAttributes })
  return nextTick()
}

const addAttribute = (type: PassEntryAttribute['type']): Promise<void> => {
  const newAttributes = entry.attributes.concat({
    label: '',
    value: '',
    type
  })
  update({ attributes: newAttributes })
  return nextTick()
}

const addTextAttribute = (): Promise<void> => addAttribute('string')

const addPasswordAttribute = (): Promise<void> => addAttribute('password')

const removeAttribute = (idx: number): Promise<void> => {
  const newAttributes = entry.attributes.toSpliced(idx, 1)
  update({ attributes: newAttributes })
  return nextTick()
}

const labelModel = ref(entry.label)
watch(labelModel, (newLabel) => {
  update({ label: newLabel })
})
</script>

<style scoped>
.entry-panel {
  border: 1px solid var(--v-theme-outline-variant);
  border-radius: 8px;
}
</style>

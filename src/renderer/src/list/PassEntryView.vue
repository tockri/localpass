<script setup lang="ts">
import { PassEntry, PassEntryAttribute } from '@common/interface'
import EditableField from '@renderer/components/EditableField.vue'
import { defineProps, nextTick, ref, toRaw } from 'vue'

const props = defineProps<{
  entry: PassEntry
}>()

const entry = ref(props.entry)

const emit = defineEmits<{
  (e: 'updated', id: string, entry: Partial<PassEntry>): void
  (e: 'remove', id: string): void
}>()

const update = (updated: Partial<PassEntry>): void => {
  entry.value = { ...toRaw(entry.value), ...updated }
  emit('updated', props.entry.id, updated)
}

const updateAttribute = (idx: number, updated: Partial<PassEntryAttribute>): Promise<void> => {
  const newAttributes = [...toRaw(entry.value).attributes]
  newAttributes[idx] = { ...newAttributes[idx], ...updated }
  update({ attributes: newAttributes })
  return nextTick()
}

const addAttribute = (): Promise<void> => {
  const newAttributes = [
    ...toRaw(entry.value).attributes,
    { label: '', value: '', type: 'string' } satisfies PassEntryAttribute
  ]
  update({ attributes: newAttributes })
  return nextTick()
}

const removeAttribute = (idx: number): Promise<void> => {
  const newAttributes = [...toRaw(entry.value).attributes]
  newAttributes.splice(idx, 1)
  update({ attributes: newAttributes })
  return nextTick()
}
</script>

<template>
  <v-card variant="flat" class="border-thin rounded">
    <v-card-title class="py-0 px-2 text-body-1 bg-grey-lighten-3 d-flex align-center">
      <editable-field
        :value="entry.label"
        class="flex-grow-1"
        @changed="(label) => update({ label })"
      />
      <v-btn icon size="small" variant="text" @click="emit('remove', entry.id)">
        <v-icon icon="mdi:mdi-delete" />
      </v-btn>
    </v-card-title>

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
            :copy-message="`${entry.label}の${attr.label} をコピーしました`"
            class="flex-grow-1"
            @changed="(value) => updateAttribute(idx, { value })"
          />
        </div>
        <div class="table-cell px-0">
          <v-btn icon size="x-small" variant="text" class="px-0" @click="removeAttribute(idx)">
            <v-icon icon="mdi:mdi-close" />
          </v-btn>
        </div>
      </div>
      <div class="table-row">
        <v-btn size="small" variant="text" @click="addAttribute">
          <v-icon icon="mdi:mdi-plus" />
          属性を追加
        </v-btn>
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
